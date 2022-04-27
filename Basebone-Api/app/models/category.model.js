const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            slug: String,
            locale: [ LocaleSchema ],
            media: MediaSchema,
            settings: SettingsSchema,
            locks: LocksSchema,
            parent_id: String,
            ancestor_ids: [ String ],
            product: String,
            path: String,
            is_indexed: Boolean,
        },
        { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', published_at: Date.now() } }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Category = mongoose.model("category", schema);
    // const Category = mongoose.model(
    //     "category",
    //     mongoose.Schema(
    //         {
    //             slug: String,
    //             locale: [ LocaleSchema ],
    //             media: MediaSchema,
    //             settings: SettingsSchema,
    //             locks: LocksSchema,
    //             parent_id: String,
    //             ancestor_ids: [ String ],
    //             product: String,
    //             path: String,
    //             is_indexed: Boolean,
    //         },
    //         { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', published_at: Date.now() } }
    //     )
    // );
    return Category;
};

let LocksSchema = new Schema({
    is_locked_for_editing: {
      type: String
    },
    current_editor: {
      type: String
    },
    is_locked_for_moderation_process: {
      type: String
    },
    is_locked_for_backend_process: {
      type: String
    },
    current_backend_process: {
      type: String
    }
});

let LocaleSchema = new Schema({
    language_iso: {
      type: String
    },
    title: {
        type: String
    },
    seo_title: {
        type: String
    },
    summary: {
        type: String
    },
    seo_summary: {
        type: String
    },
    description: {
        type: String
    },
    seo_description: {
        type: String
    },
    specify_seo_values: {
        type: Boolean
    }
});

let SettingsSchema = new Schema({
  is_premium: {
    type: Boolean
  },
  excluded_domains: {
    type: [ String ]
  },
  excluded_countries_iso: {
    type: [ String ]
  },
  excluded_network_endpoints: {
    type: [ Number ]
  },
  age_rating: {
    type: Number
  }
});

let MediaSchema = new Schema({
    icon: {
      type: String
    },
    portrait: {
      type: [ String ]
    },
    landscape: {
      type: [ String ]
    },
    square: {
      type: [ String ]
    },
});
