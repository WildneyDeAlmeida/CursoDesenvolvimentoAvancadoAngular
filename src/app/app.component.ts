import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <span style="display: block">{{ title }} app is running!</span>
      <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/cli">CLI Documentation</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
      </li>
    </ul>
    
  `,
  styles: []
})
// implementamos a interface onInit

export class AppComponent implements OnInit {
  
  title = 'RXJS';

  // Criando um método que retorna uma Promise:

  minhaPromise(nome: string) : Promise<string> {
  // Dentro dessa Promise, vamos passar um nome: string
  // Essa Promise pode retornar tanto uma resposta positiva (resolve), quanto uma resposta negativa (reject).
    return new Promise((resolve, reject) => {
      if (nome === 'Eduardo'){
        setTimeout(() => {
          resolve('Seja bem vindo ' + nome);
        }, 1000);
      }
      else {
        reject('Ops! Você não é o Eduardo');
      }
    })
  }

  // Criando um método que retorna uma Observable:

  minhaObservable(nome: string) : Observable<string> {
    return new Observable(Subscriber => {
      if (nome === 'Eduardo') {
        Subscriber.next('Olá! ' + nome);
        Subscriber.next('Olá de novo! ' + nome);
        setTimeout(() => {
          Subscriber.next('Resposta com delay');
        }, 5000);
        // Fiz tudo que tinha que fazer e você não vai receber mais nada agora:
        Subscriber.complete(); 
      }  
      else {
        Subscriber.error('Ops! Deu erro!');
      }  
    })
  }

  // Criando um método que retorna uma Observable que retorna um objeto tipado: 
  usuarioObservable(nome: string, email: string) : Observable<Usuario> {
    return new Observable(Subscriber => {
      if (nome === 'Admin') {
        let usuario = new Usuario(nome, email);
        setTimeout(() => {
          Subscriber.next(usuario);
        }, 1000);
        setTimeout(() => {
          Subscriber.next(usuario);
        }, 2000);
        setTimeout(() => {
          Subscriber.next(usuario);
        }, 3000);
        setTimeout(() => {
          Subscriber.next(usuario);
        }, 4000);
        setTimeout(() => {
          Subscriber.complete(); 
        }, 5000);
      }  
      else {
        Subscriber.error('Ops! Deu erro!');
      }  
    })
  }

  // O OnInit é sempre o primeiro método que é chamado dentro do construtor, assim que inicializar o componente. 
  // Dentro do OnInit vamos fazer a declaração da chamada dessa Promise

  ngOnInit(): void {
    // Chamada da Promise --------------------------------------------------------------------------------------------

    // Exemplo de resposta positiva: 
    // this.minhaPromise('Eduardo')
    // .then(result => console.log(result))

    // Exemplo de resposta negativa:
    // this.minhaPromise('José')
    // .then(result => console.log(result))
    // Está chamada irá retornar um runtime error. Para que isso não ocorra, podemos tratar esse erro:    
    // .catch(erro => console.log(erro))

    // Chamada da Observable -----------------------------------------------------------------------------------------

    // this.minhaObservable('Eduardo')
    //   .subscribe(
    //     result => console.log(result),
    //     erro => console.log(erro));
    //     () => console.log('FIM');

    // Criando um observer (estrutura de funções para trabalhar com o Subscriber de uma Observable) ------------------

    // Vamos criar uma constante, chamada observer, que vai ser igual a uma estrutura de um objeto.
    // Ele contém instruções do que fazer no caso de um Recebimento de valor, de um Erro e caso a Observable chegue até o fim do processo dela.
    // Esses nomes: next, error e complete são referências às chamadas do subscriber dentro do método MinhaObservable(). Então, no momento de criar um Observer, precisamos respeitar toda a estrutura em torno da Observable.

     const observer = {
      // Recebimento
      next: valor => console.log('Next: ', valor),
      // Erro
      error: erro => console.log('Erro: ', erro),
      // Fim
      complete: () => console.log('FIM')
     }

    // Observable dentro de uma const --------------------------------------------------------------------------------

    // Chamada da minhaObservable()
    //  const obs = this.minhaObservable('Eduardo');
    //  obs.subscribe(observer);

    // Chamada da usuarioObservable()
    const obs = this.usuarioObservable('Admin', 'admin@admin.com');
    const subs =  obs.subscribe(observer);

    // Fechando uma conexão com o unsubscribe
    setTimeout(() => {
      subs.unsubscribe();
      console.log("Conexão fechada: " + subs.closed);
    }, 3500);
  }
}
export class Usuario {

  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;    
  }

  nome: string;
  email: string;
}
