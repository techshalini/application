

const cds = require("@sap/cds");

const { expect, GET, POST } = cds.test.in(__dirname, "..").run(

    "serve", "--with-mocks", "--in-memory");


  // New changes to push the code to github  -2

describe("Testing OData APIs", () => {

  it("test status codes", async () => {

    const { data } = await GET`/odata/v4/escalation-management/Statuses?$select=code`;

    expect(data.value).to.eql([

      { code: "CMP" },

      { code: "DRF" },

      { code: "INP" },

    ]);

  });

});