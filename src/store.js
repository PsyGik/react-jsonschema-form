import create from "zustand";
import { persist } from "zustand/middleware";
const initialData = {
  schema: {
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
      firstName: {
        type: "string",
        title: "First name",
        default: "Chuck",
      },
      lastName: {
        type: "string",
        title: "Last name",
      },
      telephone: {
        type: "string",
        title: "Telephone",
        minLength: 10,
      },
    },
  },

  uiSchema: {
    firstName: {
      "ui:autofocus": true,
      "ui:emptyValue": "",
      "ui:autocomplete": "family-name",
    },
    lastName: {
      "ui:emptyValue": "",
      "ui:autocomplete": "given-name",
    },
    age: {
      "ui:widget": "updown",
      "ui:title": "Age of person",
      "ui:description": "(earthian year)",
    },
    bio: {
      "ui:widget": "textarea",
    },
    password: {
      "ui:widget": "password",
      "ui:help": "Hint: Make it strong!",
    },
    date: {
      "ui:widget": "alt-datetime",
    },
    telephone: {
      "ui:options": {
        inputType: "tel",
      },
    },
  },

  data: {
    firstName: "Chuck",
    lastName: "Norris",
    age: 75,
    bio: "Roundhouse kicking asses since 1940",
    password: "noneed",
  },
};

const useFormStore = create(
  persist(
    (set, get) => ({
      schema: initialData.schema,
      uiSchema: initialData.uiSchema,
      data: initialData.data,
      saveSchema: (payload) => set(() => ({ schema: payload })),
      saveUISchema: (payload) => set(() => ({ uiSchema: payload })),
      saveData: (payload) => set(() => ({ data: payload })),
    }),
    {
      name: "schema-store", // unique name
    }
  )
);

export default useFormStore;
