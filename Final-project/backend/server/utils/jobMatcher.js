const calculateJobMatch = (user, job) => {

    const userSkills = (user.skills || []).map(skill =>
        skill.toLowerCase().trim()
    );

    const jobSkills = (job.skills || []).map(skill =>
        skill.toLowerCase().trim()
    );

    const matchedSkills = jobSkills.filter(skill =>
        userSkills.includes(skill)
    );

    const missingSkills = jobSkills.filter(skill =>
        !userSkills.includes(skill)
    );

    let score = 0;

    if (jobSkills.length > 0) {
        score = Math.round(
            (matchedSkills.length / jobSkills.length) * 100
        );
    }

    const reasons = [];

    if (matchedSkills.length > 0) {
        reasons.push(`${matchedSkills.length} matching skill(s)`);
    }

    if (
        user.location &&
        job.employer?.companyProfile?.location &&
        user.location
            .toLowerCase()
            .includes(job.employer.companyProfile.location.toLowerCase())
    ) {
        score += 5;
        reasons.push("Preferred location");
    }

    if (
        user.careerPreferences?.preferredRole &&
        job.title
            .toLowerCase()
            .includes(user.careerPreferences.preferredRole.toLowerCase())
    ) {
        score += 10;
        reasons.push("Preferred role");
    }

    score = Math.min(score, 100);

    return {
        matchScore: score,
        matchedSkills,
        missingSkills,
        reasons,
    };
}

module.exports = { calculateJobMatch };