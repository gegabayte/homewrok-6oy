import { useState, useEffect } from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { nanoid } from 'nanoid';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { vallidate } from './uilits/function';
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('Xasanboy');
  const [surName, setSurName] = useState('Muhammaddinov');
  const [email, setEmail] = useState('xasanboymuhammaddinovn1@gmail.com');
  const [age, setAge] = useState(15);
  const [pass, setPass] = useState(1234);
  const [nat, setNat] = useState('');
  const [isUpDate, setisUpDate] = useState(false);
  const [upDateId, setUpDateId] = useState('');

  function getUsers() {
    let users = [];
    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem('users'));
    }
    return users;
  }

  function handleTrush (item) {
    let isDelit = confirm('Rostan ham ochirmohchiomsiz');

    if (isDelit) {
      let copied = JSON.parse(JSON.stringify(users));
      copied = copied.filter(user => {
        return  user.id != item.id
      })

      localStorage.setItem('users' , JSON.stringify(copied));
      setUsers(copied)
    }
  }

  useEffect(() => {
    let u = getUsers();
    setUsers(u);
    
  }, [])


  function handleRadioBtn(value) {
    setNat(value)
  }


  function handleShow(order, user) {
    let copied = JSON.parse(JSON.stringify(users));

    copied = copied.map(el => {
      if (el.id == user.id && order == 'show') {
        el.visible = true
      }

      if (el.id == user.id && order == 'hide') {
        el.visible = false
      }
      return el;
    })
    setUsers(copied)
  }

  function handleUpDate () {

  }

  function handleUpdateItem (user) {
    setName(user.name)
    setSurName(user.surName)
    setAge(user.age)
    setEmail(user.email)
    setPass(user.pass)
      setisUpDate(user);
      setUpDateId(user.id)
  }

  function handleBtn(e) {
    e.preventDefault();
    let isValid = vallidate(name, surName, age, email, pass, nat);
    if (isValid) {
      let user = {
        name: name,
        surName: surName,
        age: age,
        email: email,
        surName: surName,
        pass: pass,
        nat: nat,
        id: nanoid(),
        visible: false
      }

      let copied = JSON.parse(JSON.stringify(users))
      copied.push(user)
      localStorage.setItem('users', JSON.stringify(copied));
      setName('');
      setAge(0);
      setEmail('');
      setSurName('');
      setPass('');
      setUsers(copied)
    }
  }

  return (
    <>
      <div className="content">
        <div className="container content__container">
          <h1>User</h1>
          <form>
            <label htmlFor="name">Name*</label>
            <input
              id='name'
              type="text"
              placeholder='Enter Name'
              value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <label htmlFor="surName">SurName*</label>
            <input
              id='surName'
              type="text"
              placeholder='Enter surName'
              value={surName}
              onChange={(e) => { setSurName(e.target.value) }}
            />

            <label htmlFor="email">Email</label>
            <input
              id='email'
              type="email"
              placeholder='Enter email'
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />

            <label htmlFor="age">Age*</label>
            <input
              id='age'
              type="number"
              placeholder='Enter Age'
              value={age}
              onChange={(e) => { setAge(e.target.value) }}
            />

            <label htmlFor="pass">Password</label>
            <input
              id='pass'
              type="password"
              placeholder='Enter password'
              value={pass}
              onChange={(e) => { setPass(e.target.value) }}
            />

            <div className="radio">
              <input type="radio" name="radio" id="uzbek" value='uzbek' onChange={(e) => { handleRadioBtn(e.target.value) }} />
              <label htmlFor="uzbek">Uzbek</label>
              <br />
              <input type="radio" name="radio" id="engilish" value='engilish' onChange={(e) => { handleRadioBtn(e.target.value) }} />
              <label htmlFor="engilish">Engilish</label>
              <br />
              <input type="radio" name="radio" id="russian" value='russsian' onChange={(e) => { handleRadioBtn(e.target.value) }} />
              <label htmlFor="russian">Russian</label>
            </div>
         {
          !isUpDate &&    <button onClick={handleBtn}>Save</button>
         }
         {
          isUpDate &&    <button className='btnprice'  onClick={handleUpDate}>UpDate</button>
         }
          </form>

          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Name</th>
                <th>SurName</th>
                <th>Email</th>
                <th>Age</th>
                <th>Password</th>
                <th>Nations</th>
                <td>Actions</td>
              </tr>
            </thead>

            <tbody>
              {
                users.length > 0 && users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.surName}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span>{user.visible ? user.pass : '***'}</span>
                          <span>
                            {
                              user.visible ? < FaEye onClick={() => { handleShow('hide', user) }} style={{ cursor: 'pointer', marginLeft: '10px' }} /> : <FaEyeSlash onClick={() => { handleShow('show', user) }} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                            }
                          </span>
                        </div>
                      </td>
                      <td>{user.nat}</td>
                      <td>
                        <div className="icons">
                          <FaRegTrashAlt onClick={() => {handleTrush(user)}} style={{ cursor: 'pointer', marginRight: '10px' }} />
                          <FaRegEdit onClick={() => {handleUpdateItem(user)}} style={{ cursor: 'pointer' }} />
                        </div>
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
