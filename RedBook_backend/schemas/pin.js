export default {
    name: 'pin',
    type: 'document',
    title: 'Pin',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title'
        },
        {
            name: 'about',
            type: 'string',
            title: 'About'
        },
        {
            name: 'destination',
            type: 'url',
            title: 'Destination'
        },
        {
            name: 'category',
            type: 'string',
            title: 'Title'
        },
        {
            name: 'image',
            type: 'string',
            title: 'Image',
            options:
                { hotspot: true }
        },
        {
            name: 'userId',
            type: 'string',
            title: 'UserId'
        },
        {
            name: 'postedBy',
            type: 'postedBy',
            title: 'PostedBy'
        },
        {
            name: 'save',
            title: 'Save',
            type: 'array',
            of:[{type:'save'}]
            
        },
        {
            name: 'comments',
            title: 'Comments',
            type: 'array',
            of:[{type:'comment'}]
            
        },

    ]
}