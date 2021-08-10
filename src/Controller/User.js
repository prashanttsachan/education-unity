const Create = async (req, res) => {
    res.send("Document created.")
}

const Update = async (req, res) => {
    res.send("Document(s) updated.")
}

const Find = async (req, res) => {
    res.send("Document fetched.")
}

module.exports = {
    Create, Update, Find
}