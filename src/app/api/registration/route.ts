import { NextResponse } from "next/server"
import path from 'path'
import fs from 'fs'
import bcrypt from 'bcryptjs'

// type

import { UsersType } from '@/types/type'

// db

import db from '@/database/users/db.json'

export const POST = async (request: Request) => {

  try {




    const { username, name, lastname, email, company, role, password } = await request.json()


    // hash password

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)


    if(!username || !name || !lastname || !email || !company || !role || !password) {
      return NextResponse.json({ message: 'Не все поля заполнены!', status: 'error' }, { status: 400 })
    }

    const newUser: UsersType  = {
      id: db.users.length + 1,
      username: username,
      name: name,
      lastname: lastname,
      email: email,
      dateCreated: new Date().toLocaleDateString(),
      password: hashedPassword,
      company: company,
      colorBoard: '#6967AB',
      role: role,
     }


     const pathToFile = path.join(process.cwd(), 'src/database/users/db.json')
     const users = db.users
     users.push(newUser)

     fs.writeFileSync(pathToFile, JSON.stringify({users: users}, null, 2), 'utf8')

     return NextResponse.json({ message: `Пользователь с именем ${newUser.name} ${newUser.lastname} создан!`, status: 'success' }, { status: 200 })

  } catch (error: Error | any) {

    return NextResponse.json({ message: error.message, status: 'error' }, { status: 500 })

  }
}