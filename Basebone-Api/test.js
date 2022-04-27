const index = require("./server");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);


test("Should create category", done => {
    const body = {
        "slug": "slug text",
            "locale": [
                {
                    "language_iso": "Lang 4545",
                    "title":  "Title 78781",
                    "seo_title": "seo title 4545",
                    "summary": "summary",
                    "seo_summary": "seo summary 45",
                    "description": "description",
                    "seo_description": "seo description",
                    "specify_seo_values": true
                }
            ],
            "media": {
                "icon": "media icon",
                "portrait": ["a", "b"],
                "landscape": ["a", "b"],
                "square": ["a", "b"]
            },
            "settings": {
                "is_premium": false,
                "excluded_domains": ["a"],
                "excluded_countries_iso": ["b"],
                "excluded_network_endpoints": [1,2],
                "age_rating": 25
            },
            "locks": {
                "is_locked_for_editing": "No",
                "current_editor": "Akha",
                "is_locked_for_moderation_process": "No",
                "is_locked_for_backend_process": "No",
                "current_backend_process": "Yes"
            },
            "parent_id": "akha",
            "ancestor_ids": ["12", "21"],
            "product": "Macs",
            "path": "/macs",
            "is_indexed": true
    };
    request(app)
      .post("/api/categories")
      .type("form")
      .send(body)
      .expect("Content-Type", /json/)
      .expect({ status: 200, message: 'success' })
      .expect(200, done);
});


test("Should failed to patch or update category with unknown id", done => {
    const body = {
        "_id": "1"
    };
    request(app)
      .patch(`/api/categories/${body._id}`)
      .type("form")
      .send({slug: "testing"})
      .expect("Content-Type", /json/)
      .expect({ message: `Category not found id=${body._id}` })
      .expect(500, done);
});

test("Should get all categories", done => {
    request(app)
      .get(`/api/categories`)
      .expect("Content-Type", /json/)
      .expect((res) => res.body.length > 0)
      .expect(200, done);
});