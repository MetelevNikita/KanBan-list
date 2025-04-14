export const registrationFunc = async (formData: FormData) => {
  try {


    const username = formData.get('username');
    const name = formData.get('name');
    const lastname = formData.get('lastname');
    const email = formData.get('email');
    const password = formData.get('password');
    const company = formData.get('company');
    const role = formData.get('role');
    const confirmPassword = formData.get('confirmPassword');


    if(!username || !name || !lastname || !email || !password ) {
      alert('Заполните все поля!')
      return
    }

    if(password !== confirmPassword) {
      alert('Пароли не совпадают!')
      return
    }

    const responce = await fetch('/api/registration', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({username, name, lastname, email, password, company, role})
    })

    const data = await responce.json();
    console.log(data);

    if(data.status === 'success') {
      alert('Регистрация прошла успешно!')
      window.location.replace('/login')
    }



  } catch (error: Error | any) {
    console.log(`Регистрация завершилась с ошибкой - ${error.message}`);
  }
}