export const authFunc = async (formData: any) => {
  try {

    const email = formData.get('email');
    const password = formData.get('password');

    if(!email || !password) {
      alert('Поле не должно быть пустым')
      return
    }

    console.log(email, password)

    const responce = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    const data = await responce.json()
    console.log(data)

    if(data) {
      window.location.href = '/'
    }
    return data


  } catch (error) {
    console.error(`Попытка войти в систему оказалась не удачной = ${error}`)
  }
}
