
"use client"

import { FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// imgs

import logo from '@/asset/header/logo.svg'

//

import { Container, Row, Col } from 'react-bootstrap'

// components

import MyInput from '@/components/UI/Input/MyInput'
import MyButton from '@/components/UI/Button/MyButton'
import MySelect from '@/components/UI/Select/MySelect'

// functions

import { registrationFunc } from '@/functions/registrationFunc'


const page: FC = () => {


  const companyArr = ["Production", "Design", "Marketing", "Consulting"]
  const roleArr = ["Worker", "Manager", "Director"]

  const [role, setRole] = useState<string>(roleArr[0])
  const [company, setCompany] = useState<string>(companyArr[0])







  return (

    <Container fluid className="d-flex flex-column justify-content-center align-items-center min-vh-100" style={{height: '100vh'}}>

      <Row md={6} className="d-flex flex-column align-items-center mb-5">
        <Col md={4} className="mx-auto d-flex justify-content-center align-items-center mb-4"><Image src={logo} alt={'logo'} width={200} height={100}/></Col>
        <Col md={12}><div>Создайте пользователя</div></Col>
      </Row>



      <form action={registrationFunc}>

      <Row className="d-flex flex-column align-items-center mb-4">

        <Col><MyInput type={'text'} name={'username'} placeholder={'Введите логин'}/></Col>

        <Col><MyInput type={'text'} name={'name'} placeholder={'Введите имя'}/></Col>
        <Col><MyInput type={'text'} name={'lastname'} placeholder={'Введите фамилию'}/></Col>
        <Col className='mb-4'><MyInput type={'email'} name={'email'} placeholder={'Введите почту'}/></Col>


        <Col className='mb-4 d-flex justify-content-center align-items-center'><MySelect title={'Выберите компанию:'} arr={companyArr} name={'company'} value={company} onChange={(e) => {setCompany(e.target.value)}}/></Col>

        <Col className='mb-4 d-flex justify-content-center align-items-center'><MySelect title={'Выберите должность:'} arr={roleArr} name={'role'} value={role} onChange={(e) => {setRole(e.target.value)}}/></Col>

        <Col><MyInput type={'password'} name={'password'} placeholder={'Введите пароль'}/></Col>
        <Col><MyInput type={'password'} name={'confirmPassword'} placeholder={'Повторите пароль'}/></Col>



        <Col className="d-flex justify-content-center align-items-center mb-4"><div style={{fontSize: '12px', width: '300px', textAlign: 'center'}}>Заполните все поля, после завершения регистрации на почту придет уведомление о регистрации.</div></Col>
      </Row>

      <Row>
        <Col className="d-flex flex-column align-items-center mb-4"><MyButton name={'login_button'} type={'submit'} text={'Создать'}/></Col>
        <Col className="d-flex flex-column align-items-center mb-4"><Link href={'/login'}><MyButton name={'login_button'} type={'button'} text={'Назад'}/></Link></Col>
      </Row>

      </form>

    </Container>

  )
}

export default page
