import React, {useRef, useCallback} from 'react';
import {
  Image,
   View,
    ScrollView,
     KeyboardAvoidingView,
      Platform,
      TextInput,
      Alert,
    } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/logo.png';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface SignUpFormData{
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try{
     formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
        password: Yup.string().min(6, 'No minimo 6 digitos'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      await api.post('/users', data);
      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Você já pode realizar seu login',
      );
      navigation.goBack();
    
    } catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);
        
        formRef.current?.setErrors(errors);

        return;
      }
      Alert.alert(
       'Erro no cadastro!',
       'Ocorreu um erro ao fazer cadastro, cheque novamente!',
      );
    }
  }, []);

  return (
    <>
    <KeyboardAvoidingView
     style={{flex: 1}}
     behavior={Platform.OS ===  'ios' ? 'padding' : undefined}
     enabled
     >
       <ScrollView
       keyboardShouldPersistTaps= "handled"
       contentContainerStyle={{flex: 1}}
       >
  <Container>
    <View>
    <Image  source={logoImg} />
    </View>
    <Title>Crie sua conta</Title>
    <Form ref={formRef} onSubmit={handleSignUp}>
    <Input
     autoCapitalize="words" 
     returnKeyType="next"
     name="name" icon="user" placeholder="Nome"
     onSubmitEditing={() => {
       emailInputRef.current?.focus();
     }}
     />
    <Input
    ref={emailInputRef}
    keyboardType="email-address" 
    autoCapitalize="none" returnKeyType="next" 
    name="email" icon="mail" placeholder="E-mail"
    onSubmitEditing={() => {
      passwordInputRef.current?.focus();
    }}
    
    />
    <Input
    ref={passwordInputRef}
     secureTextEntry
      textContentType="newPassword"
      returnKeyType="send"
      onSubmitEditing={() => formRef.current?.submitForm()}
       name="password" icon="lock" placeholder="Semha"
       />
    <Button onPress={() => formRef.current?.submitForm()} style={{width:350}}>
      Entrar
      </Button>
      </Form>
  </Container>
  </ScrollView>
  <BackToSignIn onPress={() => navigation.goBack()}>
    <Icon name="arrow-left" size={20} color= "#fff" />
    <BackToSignInText>Voltar para login</BackToSignInText>
  </BackToSignIn>
  </KeyboardAvoidingView>
  </>
  );
};

export default SignUp;