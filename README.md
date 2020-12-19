npx react-native init appgobarber --template react-native-template-typescript
criar pasta src (App.tsx)
yarn add @react-navigation/native

yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

yarn add @react-navigation/stack

google.fonts(roboto slab medium 500, regular 400) download
yarn react-native link
final do arquivo build.gradle adicione(project.ext.vectoricons = [
    iconFontNames: [ 'Feather.ttf' ]
]
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle")
yarn add react-native-vector-icons
yarn add react-native-iphone-x-helper(library iphone para espaco no rodape)
yarn add @unform/core @unform/mobile
yarn add yup(validacao)
yarn add axios(conexao com api)
yarn add @react-native-community/async-storage(armazenar dados)
yarn add @react-native-community/datetimepicker