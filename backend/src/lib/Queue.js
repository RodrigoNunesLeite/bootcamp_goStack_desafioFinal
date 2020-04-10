import Bee from 'bee-queue';

import OrderMail from '../app/jobs/OrderMails';
import CancellationMail from '../app/jobs/CancellationMails';
import redisConfig from '../config/redis';

// Sempre que surgir um novo job, acrescentamos no vetor
const jobs = [OrderMail, CancellationMail];

class Queue {
  // cada tipo de job vai ter sua propria fila
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    /**
     * Como não preciso retornar nada do metodo, usamos o foreach
     *
     * key, handle = se trata da chave e metodo, criados no jobs
     * orderMail
     */

    // inicializando as filas
    jobs.forEach(({ key, handle }) => {
      /**
       * Instanciando o bee que cria filas e passando o valor chave
       *
       * Nesse trecho passamos por cada objeto definido na variavel jobs,
       * e criamos um valor para queues de acordo com a chave e em seguida
       * instanciamos o bee (que gera filas), passando a chave do jobs e o
       * metodo que vai ser executado
       */
      this.queues[key] = {
        bee: new Bee(key, {
          // conexao com o redis
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  /**
   * Cada vez que o e-mail é disparado, incluimos o objeto na fila
   *
   * Adicionando novos elementos dentro da fila:
   *
   * queue = qual fila vou adicionar um novo job
   * job = São as informações que serão passadas para o metodo handle
   * createJob = é um metodo do objeto bee
   * queue = no caso recebe orderMails
   */

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // processando as filas
  processQueue() {
    jobs.forEach(job => {
      /**
       * Pega o bee e o handle, carregados na variavel queues
       *
       * bee é a fila
       */
      const { bee, handle } = this.queues[job.key];

      /**
       * on('failed') = Esse comando faz com que o bee fique ouvindo
       * se ocorrem erros
       */
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
