/**
 * Bulk Job Insert Script — matches models/Job.js exactly
 *
 * Usage:
 *   MONGO_URI="mongodb://localhost:27017/job_portal" \
 *   DEFAULT_EMPLOYER_ID="663f1c2e5a1b2c0012a3b456" \
 *   node bulkInsertJobs.js jobs.json
 *
 * jobs.json: array of job objects. Each job MAY include its own "employer"
 * (User _id) to override DEFAULT_EMPLOYER_ID. If neither is present, that
 * job is skipped (not silently inserted with a fake employer).
 *
 * Deps: npm install mongoose
 */

require('dotenv').config(); // loads MONGO_URI and DEFAULT_EMPLOYER_ID from .env automatically

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Adjust this path to wherever your Job model actually lives relative to this script
const Job = require('./models/Job');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/job_portal';
const DEFAULT_EMPLOYER_ID = process.env.DEFAULT_EMPLOYER_ID || null;

function parseDeadline(value) {
  if (!value) return null; // schema allows null
  const [mm, dd, yyyy] = value.split('/');
  const d = new Date(`${yyyy}-${mm}-${dd}`);
  return isNaN(d.getTime()) ? null : d;
}

function normalizeJob(raw, index) {
  const employer = raw.employer || DEFAULT_EMPLOYER_ID;

  if (!employer) {
    return { error: `Job at index ${index} ("${raw.title || 'untitled'}") has no employer and no DEFAULT_EMPLOYER_ID set. Skipped.` };
  }
  if (!mongoose.Types.ObjectId.isValid(employer)) {
    return { error: `Job at index ${index} ("${raw.title || 'untitled'}") has invalid employer ObjectId: ${employer}. Skipped.` };
  }

  const salaryNum = Number(raw.salary);
  if (raw.salary !== undefined && isNaN(salaryNum)) {
    return { error: `Job at index ${index} ("${raw.title || 'untitled'}") has non-numeric salary: "${raw.salary}". Skipped.` };
  }

  return {
    doc: {
      employer,
      title: raw.title,
      company: raw.company || raw.companyName, // accept either key
      location: raw.location,
      salary: salaryNum,
      category: raw.category,
      description: raw.description,
      jobType: raw.jobType || 'Full-Time',
      experienceLevel: raw.experienceLevel || 'Fresher',
      skills: Array.isArray(raw.skills)
        ? raw.skills
        : (raw.skills ? String(raw.skills).split(',').map(s => s.trim()) : []),
      vacancies: raw.vacancies ? Number(raw.vacancies) : 1,
      deadline: parseDeadline(raw.applicationDeadline || raw.deadline),
      status: raw.status || 'Open',
      images: Array.isArray(raw.images)
        ? raw.images
        : (raw.image ? [raw.image] : []) // accept singular "image" too
    }
  };
}

async function run() {
  const inputFile = process.argv[2];
  if (!inputFile) {
    console.error('Usage: node bulkInsertJobs.js <path-to-jobs.json>');
    process.exit(1);
  }

  const filePath = path.resolve(inputFile);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const rawJobs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (!Array.isArray(rawJobs)) {
    console.error('jobs.json must be a top-level array.');
    process.exit(1);
  }

  const docsToInsert = [];
  const skipped = [];

  rawJobs.forEach((raw, i) => {
    const { doc, error } = normalizeJob(raw, i);
    if (error) {
      skipped.push(error);
    } else {
      docsToInsert.push(doc);
    }
  });

  if (skipped.length) {
    console.warn(`\n${skipped.length} job(s) skipped due to missing/invalid data:`);
    skipped.forEach(s => console.warn(' - ' + s));
    console.warn('');
  }

  if (docsToInsert.length === 0) {
    console.error('No valid jobs to insert. Exiting.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // ordered:false => one bad doc doesn't block the rest from inserting
    const result = await Job.insertMany(docsToInsert, { ordered: false });
    console.log(`Inserted ${result.length} of ${rawJobs.length} jobs.`);
  } catch (err) {
    if (err.writeErrors) {
      console.error(`${err.writeErrors.length} document(s) failed validation/insertion:`);
      err.writeErrors.forEach(we => console.error(' - ' + we.errmsg));
      const insertedCount = rawJobs.length - skipped.length - err.writeErrors.length;
      console.log(`Inserted ${insertedCount} of ${rawJobs.length} jobs.`);
    } else {
      console.error('Error inserting jobs:', err.message);
    }
  } finally {
    await mongoose.disconnect();
  }
}

run();
