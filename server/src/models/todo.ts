import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const TodoSchema = new Schema({
  title: String,
  description: String,
  dueDate: Date,
  ordinal: Number,
  status: {
    type: String,
    enum: ["completed", "pending"],
    default: "pending",
  },
});

const TodoModel = mongoose.model("Todo", TodoSchema);

export default TodoModel;
