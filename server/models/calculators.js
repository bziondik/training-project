const mongoose = require('mongoose');

const { Schema } = mongoose;

const calculatorSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    name: {
      type: String,
    },
    settings: {
      type: Schema.Types.Mixed,
    },
    formula: {
      type: String,
    },
    isTemplate: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

/* eslint-disable func-names */
calculatorSchema.methods.toJSON = function () {
  return {
    id: this._id, // eslint-disable-line
    username: this.author.username,
    name: this.name,
    settings: this.settings,
    formula: this.formula,
    isTemplate: this.isTemplate,
    createdAt: this.createdAt,
  };
};

mongoose.model('calculator', calculatorSchema);
