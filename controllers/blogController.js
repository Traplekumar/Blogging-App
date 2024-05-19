const Blog = require("../models/blog");

const blogIndex = (req, res) => {
    Blog.find().sort({createdAt: -1})   // -----> mongoose (object) find is a async function
        .then((result) => {
            res.render('blogs/index', {title: 'Home', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        })
}

const blogCreatePost = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()                         // -----> mongoose (object) saving is a async function.
        .then((result) => {
            console.log('successfully saved blog');
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
}

const blogCreateGet = (req, res) => {
    res.render('blogs/create', {title: 'Create'});
}

const blogDetailsGet = (req, res) => {   // -----> route parameter
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/singleBlog', {title: "Single Blog", blog: result});
        })
        .catch((err) => {
            console.log(err);
        })       
}

const blogDetailsDelete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/blogs'});
    })
    .catch((err) => {
        console.log(err);
    })
}

const blogDetailsPost = (req, res) => {
    const id = req.params.id;
    const updBlog = req.body;
    Blog.findOneAndUpdate({_id: id}, updBlog)
        .then((result) => {
            console.log("blog updated successfully.")
            res.redirect(`/blogs/${id}`)
        })
        .catch((err) => {
            console.log(err);
        })
}

const blogUpdate = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/update', {title: 'Update', blog:result})
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = {
    blogIndex,
    blogCreatePost,
    blogCreateGet,
    blogDetailsGet,
    blogDetailsDelete,
    blogDetailsPost,
    blogUpdate

}