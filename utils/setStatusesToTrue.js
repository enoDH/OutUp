module.exports.setStatus = function (weeks) {
    for (let days of weeks) {
        for (let exercises of days['days']) {
            for (let exercise of exercises['exercises']) {
                exercise.status = true;
            }
        }
    }

    return weeks;
};