module.exports = {
  "parser": "babel-eslint",
  "rules": {
    "strict": 0
  },
  "extends": "airbnb",
  "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "no-underscore-dangle": ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }],
      "import/no-named-as-default": 0,
      "jsx-a11y/anchor-is-valid": [ "error", {
        "components": [ "Link" ],
        "specialLink": [ "to" ]
      }],
    },
    "env": {
      "browser": true,
      "node": true
    },
};