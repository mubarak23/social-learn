import mongoose from 'mongoose';


const postSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },

  photo: {
    type: String,
    required: false,
  },

  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'},

  likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],

    comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId
      },
      text: {
        type: String,
      },
      name: {
        type: String
      },
      photo: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

     likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId
      }
    }
  ],
},
{
    timestamps: true,
}
)

const Post = mongoose.model('Post', postSchema)

export default Post