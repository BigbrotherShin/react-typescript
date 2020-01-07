import React, { useState } from 'react';

type MyFormProps = {
  // type Params = {
  //   name: string;
  //   description: string;
  // }
  // onSubmit: (form: Params) => void;
  onSubmit: (form: { name: string; description: string }) => void;
};

function MyForm({ onSubmit }: MyFormProps) {
  const [form, setForm] = useState({
    name: '',
    description: '',
  });

  const { name, description } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지 새로고침 방지
    onSubmit(form);
    setForm({
      name: '',
      description: '',
    }); // 초기화
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} />
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  );
}

export default MyForm;
