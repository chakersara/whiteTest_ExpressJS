//Sarra Chaker GLSI-B && Chaima Arfaoui GLSI-A

getUser(1)
    .then((user) => getRepositories(user.githubUsername, 2))
    .then((repos) => getBrunch(repos.repo[repos.level]))
    .then((brunch) => {
        if (brunch == "master")
            postCommit('new Version').then((commited) =>{
                if (commited) console.log("The new version is commited")})
        else
            console.log("The new version is not commited");
    })

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("User is founded");
            resolve({
                id: id,
                githubUsername: "sarra_chaker chaima_arfaoui"
            });
        }, 2000);
    });
}

function getRepositories(username, level) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("repos is ready");
            resolve({
                repo: ['br1', 'main', 'master'],
                level: level
            });
        }, 2000);
    });
}

function getBrunch(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('repo[] is ready');
            resolve(repo);
        }, 2000);
    });
}

function postCommit(vers) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("new Version");
            resolve(vers == 'new Version');
        }, 2000);
    });
}