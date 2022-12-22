// Index
index = async (req, res) => {
    return res.render('home', {
        layout: 'layouts/main',
        title: 'Halaman Home'
    });
}

// Chat
chat = async (req, res) => {
    return res.render('chat', {
        layout: 'layouts/main',
        title: 'Halaman Chat'
    });
}


module.exports = {
    index,
    chat
};