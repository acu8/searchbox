import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  //setUsersの中身が入った時に、users変数の値が更新され画面が再レンダリングされる。
  //usersの値が変わった時だけ画面が再レンダリングされるフックス
  const [users, setUsers] = useState([]);

  //フィルタリングした後の値を格納するための変数
  //searchQueryにフィルタした後のuser情報を格納するための配列
  const [searchQuery, setSearchQuery] = useState([]);

  const ref = useRef();

  //ページがマウントされた１回だけでいいからuseEffectを使用
  //第二引数に空の配列を入れると、ページがマウントされた１回だけ第一引数の処理が発火する
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json()) //responseをjson形式で受け取る
    .then((data) => setUsers(data)); //受け取ったjson形式のデータをsetUsersの中身を書き換えてusersを更新
  }, []);

  const handleSearch = () => {
    console.log(ref.current.value);

    //フィルタリング(検索)機能を追加
    setSearchQuery(
      //toLowerCase()関数でusernameの情報を小文字に変換、それが検索ボックスに入力された値と対応したら残す
      //
        users.filter((user) => user.name.toLowerCase().includes(ref.current.value))
    );
  };

  return (
    <div className='App'>
       <div className='main'>
        <h2>検索アプリ</h2>
        {/* refプロパティにuseRefの情報を渡す */}
        <input type='text' ref={ref} onChange={() => handleSearch()} />
        <div className='content'>
          {searchQuery.map((user) => (
            <div className='box' key={user.id}>
            <h3>{user.name}</h3>
            <hr />
            <p>{user.email}</p>
            </div>
          ))}
          </div>
      </div>
    </div>
  );
}

export default App;
