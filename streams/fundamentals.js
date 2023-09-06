//process.stdin
  //.pipe(process.stdout)

  import { Readable,Writable, Transform } from 'node:stream'
  
  class OneToHundredStream extends Readable {
    index =1

    _read() {
      const i = this.index++

      setTimeout(()=> {
        if (i > 100){
          this.push(null)
        }else {
          const buf = Buffer.from(String(i))

          this.push(buf)
        }
      },1000)
    }
  }

  class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback) {
      const transformed = (Number(chunk.toString())*-1)
      callback(null, Buffer.from(String(transformed)))
    }
  }

  class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {

      console.log(Number(chunk.toString()) * 10)
      callback()

    }
    
  }




  new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())
    /* nesse codigo ele utilizou o buffer pq por aqui nao se pode 
    utilizar numeros ou booleanos, por isso ele utilizou o buffer. exemplo dos numeros indo automatica e a 
    cada dado vc ja pode processa-los( parte do primeiro codigo de escrita .pipe(process.stdout)*/