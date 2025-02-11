import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./formulario-validacao.css";

const Formulario = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors
  } = useForm();

  const [menorIdade, setMenorIdade] = useState(false);

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  };

  const onSubmit = (data) => {
    if (!validarCPF(data.cpf)) {
        setError("cpf", { type: "manual", message: "CPF inválido" });
        return;
      }
    console.log("Dados enviados:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Informações Pessoais</h2>
      <input className={errors.nomeCompleto ? "error" : ""} placeholder="Nome Completo" {...register("nomeCompleto", { required: "Nome completo é obrigatório" })} />
      <p>{errors.nomeCompleto?.message}</p>

      <input className={errors.dataNascimento ? "error" : ""}
        type="date"
        {...register("dataNascimento", {
          required: "Data de nascimento é obrigatória",
          validate: (value) => {
            const idade = new Date().getFullYear() - new Date(value).getFullYear();
            setMenorIdade(idade < 18);
            return true;
          }
        })}
      />
      <p>{errors.dataNascimento?.message}</p>

      <input className={errors.cpf ? "error" : ""} placeholder="CPF (XXX.XXX.XXX-XX)" {...register("cpf", { 
        required: "CPF é obrigatório", 
        pattern: { value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, message: "Formato inválido (XXX.XXX.XXX-XX ou 11 dígitos)" } 
      })} />
      <p>{errors.cpf?.message}</p>
      
      <input className={errors.telefoneFixo ? "error" : ""} placeholder="Telefone Fixo" {...register("telefoneFixo", { required: "Telefone fixo é obrigatório" })} />
      <p>{errors.telefoneFixo?.message}</p>
      
      <input className={errors.celular ? "error" : ""} placeholder="Celular" {...register("celular", { required: "Celular é obrigatório" })} />
      <p>{errors.celular?.message}</p>

      {menorIdade && (
        <>
          <input className={errors.nomePai ? "error" : ""} placeholder="Nome do Pai" {...register("nomePai", { required: menorIdade ? "Nome do pai é obrigatório" : false })} />
          <p>{errors.nomePai?.message}</p>

          <input className={errors.nomeMae ? "error" : ""} placeholder="Nome da Mãe" {...register("nomeMae", { required: menorIdade ? "Nome da mãe é obrigatório" : false })} />
          <p>{errors.nomeMae?.message}</p>
        </>
      )}

      <h2>Endereço</h2>
      <input className={errors.cep ? "error" : ""} placeholder="CEP" {...register("cep", { required: "CEP é obrigatório", pattern: { value: /^\d{5}-\d{3}$/, message: "CEP inválido" } })} />
      <p>{errors.cep?.message}</p>
      
      <input className={errors.endereco ? "error" : ""} placeholder="Endereço" {...register("endereco", { required: "Endereço é obrigatório" })} />
      <p>{errors.endereco?.message}</p>
      
      <input className={errors.numero ? "error" : ""} placeholder="Número" {...register("numero", { required: "Número é obrigatório" })} />
      <p>{errors.numero?.message}</p>
      
      <input className={errors.cidade ? "error" : ""} placeholder="Cidade" {...register("cidade", { required: "Cidade é obrigatória" })} />
      <p>{errors.cidade?.message}</p>
      
      <input className={errors.estado ? "error" : ""} placeholder="Estado" {...register("estado", { required: "Estado é obrigatório" })} />
      <p>{errors.estado?.message}</p>
      
      <h2>Informações da Conta</h2>
      <input className={errors.email ? "error" : ""} type="email" placeholder="Email" {...register("email", { required: "E-mail é obrigatório", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail inválido" } })} />
      <p>{errors.email?.message}</p>
      
      <input className={errors.senha ? "error" : ""} type="password" placeholder="Senha" {...register("senha", { required: "Senha é obrigatória", minLength: { value: 8, message: "Senha deve ter no mínimo 8 caracteres" } })} />
      <p>{errors.senha?.message}</p>
      
      <input className={errors.confirmarSenha ? "error" : ""} type="password" placeholder="Confirmar Senha" {...register("confirmarSenha", { required: "Confirmação de senha é obrigatória", validate: value => value === watch("senha") || "As senhas devem ser iguais" })} />
      <p>{errors.confirmarSenha?.message}</p>
      
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
