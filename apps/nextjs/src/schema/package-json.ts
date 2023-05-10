export const packageJsonSchema = {
  type: "object",
  properties: {
    dependencies: {
      type: "object",
      additionalProperties: {
        type: "string",
      },
      minProperties: 1,
    },
    devDependencies: {
      type: "object",
      additionalProperties: {
        type: "string",
      },
      minProperties: 1,
    },
  },
  anyOf: [
    {
      required: ["dependencies"],
    },
    {
      required: ["devDependencies"],
    },
  ],
  minProperties: 1,
};
