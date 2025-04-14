'use client'

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";


//

import { Container, Row, Col } from "react-bootstrap";

// img

import logo from '@/asset/header/logo.svg'

// components

import MyInput from "@/components/UI/Input/MyInput";
import MyButton from "@/components/UI/Button/MyButton";

// fn

import { authFunc } from '@/functions/authFunc'

//





const AuthPage: FC = () => {


  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center min-vh-100" style={{height: '100vh'}}>

      <Row md={6} className="d-flex flex-column align-items-center mb-5">
        <Col md={4} className="mx-auto d-flex justify-content-center align-items-center"><Image src={logo} alt={'logo'} width={200} height={100}/></Col>
      </Row>



      <form action={authFunc}>

      <Row className="d-flex flex-column align-items-center mb-4">
        <Col><MyInput type={'email'} name={'email'} placeholder={'Введите почту'}/></Col>
        <Col><MyInput type={'password'} name={'password'} placeholder={'Введите пароль'}/></Col>
      </Row>

      <Row>
        <Col className="d-flex flex-column align-items-center mb-4"><MyButton name={'login_button'} type={'submit'} text={'Войти'}/></Col>
        <Col className="d-flex flex-column align-items-center mb-4"><Link href={'/registration'}><MyButton name={'registration_button'} type={'button'} text={'Регистрация'}/></Link></Col>
      </Row>

      </form>




    </Container>
  )
}

export default AuthPage