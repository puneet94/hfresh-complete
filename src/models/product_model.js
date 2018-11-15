module.exports = (sequelize, type) => {
    return sequelize.define('wp_posts', {

        post_author: type.STRING,
        post_date: type.STRING,
        post_date_gmt: type.STRING,
        post_content: type.STRING,
        post_title: type.STRING,
        post_excerpt: type.STRING,
        post_status: type.STRING,
        comment_status: type.STRING,
        ping_status: type.STRING,
        post_password: type.STRING,
        post_name: type.STRING,
        to_ping: type.STRING,
        pinged: type.STRING,
        post_modified: type.STRING,
        post_modified_gmt: type.STRING,
        post_content_filtered: type.STRING,
        post_parent: type.STRING,
        guid: type.STRING,menu_order: type.STRING,
        menu_order: type.STRING,
        post_mime_type: type.STRING,
        comment_count: type.STRING
    })
}