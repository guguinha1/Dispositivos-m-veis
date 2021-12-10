import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../models/Cliente';
import { StorageService } from '../services/storage.service';
import { comparaValidator } from '../validators/comparaValidator';
import { CpfValidator } from '../validators/cpfValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formCadastro: FormGroup;

  cliente: Cliente = new Cliente();

  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório.' }
    ],
    cpf: [
      { tipo: 'required', mensagem: 'O campo CPF é obrigatório.' },
      { tipo: 'invalido', mensagem: 'CPF Inválido.' },
    ],
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório.' },
      { tipo: 'email', mensagem: 'E-mail Inválido.' },
    ],
    senha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 5 caracteres.', }
    ],
    confirmaSenha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 5 caracteres.' },
      { tipo: 'comparacao', mensagem: 'Deve ser igual a senha.' },
    ],
  };

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private route: Router) {
    this.formCadastro = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.compose([Validators.required, CpfValidator.cpfValido])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    }, {
      validator: comparaValidator('senha', 'confirmaSenha')
    });
  }

  ngOnInit() {
  }

  async salvarCadastro() {
    if (this.formCadastro.valid) {
      this.cliente.nome = this.formCadastro.value.nome;
      this.cliente.cpf = this.formCadastro.value.cpf;
      this.cliente.email = this.formCadastro.value.email;
      this.cliente.senha = this.formCadastro.value.senha;
      await this.storageService.set(this.cliente.cpf, this.cliente);
      this.route.navigateByUrl('/home');
    } else {
      alert('Formulário Inválido!');
    }
  }
}
