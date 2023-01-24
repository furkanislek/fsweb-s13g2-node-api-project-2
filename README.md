# Sunucu tarafı Routing Modül Projesi

## Giriş

"Blog posts" üzerinde _CRUD_ işlemleri gerçekleştiren bir API oluşturmak için "Node.js" ve "Express" kullanın.

## Talimatlar

### Görev 1: Proje Kurulumu

Bu projeyi forkladıktan sonra bilgisayarınıza klonlayın.

### Görev 2: MVP

- Aşağıda listelenen uç noktaları uygulamak için `index.js`, `api/server.js` ve `api/posts/posts-router.js` sayfalarına gerekli kodu ekleyin.
- `/api/posts` ile başlayan uç noktaları `api/posts/posts-router.js` içindeki ayrı bir Ekspres Yönlendiriciye ayırın.
- API'yi aşağıdaki yolları işleyecek şekilde yapılandırın. Bu uç noktalardan bazıları, `api/posts/posts-model.js` içinde sağlanan veritabanı yardımcılarına birden fazla çağrı yapılmasını gerektirebilir.

| N | Metod  | Uçnokta                 | Açıklama                                                                                                                     |
| - | ------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1 | GET    | /api/posts              | Veritabanında bulunan **tüm post nesnelerinin bir dizisini** döndürür                                                             |
| 2 | GET    | /api/posts/:id          | **belirtilen kimliğe sahip post nesnesini** döndürür                                                                              |
| 3 | POST   | /api/posts              | İstek gövdesi içinde gönderilen bilgileri kullanarak bir post oluşturur ve **yeni oluşturulan post nesnesini** döndürür           |
| 4 | PUT    | /api/posts/:id          | İstek gövdesinden alınan verileri kullanarak postu belirtilen id ile günceller ve orijinali değil **değiştirilen postu döndürür** |
| 5 | DELETE | /api/posts/:id          | Belirtilen kimliğe sahip gönderiyi kaldırır ve **silinmiş gönderi nesnesini** döndürür                                            |
| 6 | GET    | /api/posts/:id/comments | Belirtilen kimliğe sahip gönderiyle ilişkili **tüm yorum nesnelerinin bir dizisini** döndürür                                     |

#### 1 [GET] /api/posts


- Veritabanından postlar alınırken hata oluşursa:
  - HTTP `500` kodu yanıtlar.
  - Şu JSON'u döndürür: `{ message: "Gönderiler alınamadı" }`.

#### 2 [GET] /api/posts/:id
İstemci `/api/posts/:id` 'e  `GET` isteği yaparsa :

- Eğer _post_ belirtilen `id` mevcut değilse:

  - HTTP `404` (Not Found) yanıtlar.
  - şu JSON'u döndürür: `{ message: "Belirtilen ID'li gönderi bulunamadı" }`.

- _post_ veritabanından alınırken bir hata oluşursa:
  - HTTP `500` yanıtlar.
  - şu JSON'u döndürür: `{ message: "Gönderi bilgisi alınamadı" }`.


#### 3 [POST] /api/posts
İstemci `/api/users` e `POST` isteği atarsa:

- Request bodyde `title` ya da `contents` eksikse:

  - HTTP `400` durum kodu (Bad Request).
  - şu JSON'u cevapta döndürür: `{ message: "Lütfen gönderi için bir title ve contents sağlayın" }`.

- Eğer _post_ bilgileri geçerliyse:

  - Yeni _post_ i veritabanına kaydedin.
  - HTTP `201` (Created) durum kodu.
  - yeni oluşturulan _post_ nesnesini döndürün.

- _post_ kaydedilirken hata oluştuysa:
  - HTTP `500` (Server Error) durum kodu cevaplar.
  - Şu JSON'u döndürün: `{ message: "Veritabanına kaydedilirken bir hata oluştu" }`.
  

#### 4 [PUT] /api/posts/:id

İstemci `/api/posts/:id` 'e  `PUT` isteği atarsa :

- Belirtilen `id` li _post_ yoksa:

  - HTTP `404` (Not Found).
  - şu JSON'u döndürür: `{ message: "Belirtilen ID'li gönderi bulunamadı" }`.

- Request bodysinde `title` ya da `contents` yoksa:

  - HTTP `400` (Bad Request).
  - şu JSON'u döndürür: `{ message: "Lütfen gönderi için title ve contents sağlayın" }`.

- _post_ i güncellerken bir hata oluşursa:

  - HTTP `500`.
  - şu JSON'u döndürür: `{ message: "Gönderi bilgileri güncellenemedi" }`.

- Eğer gönderi varsa ve girilen bilgiler geçerliyse:

  - "istek gövdesi"nde gönderilen yeni bilgileri kullanarak veritabanındaki gönderi nesnesini güncelleyin.
  - HTTP `200` (OK).
  - güncellenen _post_ nesnesini döndürür.
  

#### 5 [DELETE] /api/posts/:id

İstemci `/api/users/:id` 'e `DELETE` isteği yaparsa :

- Eğer belirtilen `id` li _post_ mevcut değilse:

  - HTTP `404` (Not Found) yanıtlar.
  - şu JSON'u döndürür: `{ message: "Belirtilen ID li gönderi bulunamadı" }`.

- Eğer gönderi veritabanından silinirken hata oluşursa:
  - HTTP `500` yanıtlar.
  - şu JSON'u döndürür: `{ message: "Gönderi silinemedi" }`.
  
#### 6 [GET] /api/posts/:id/comments

- Eğer `id` li  _post_ mevcut değilse:

  - HTTP `404` (Not Found).
  - şu JSON'u döndürür: `{ message: "Girilen ID'li gönderi bulunamadı." }`.

- Eğer _comments_ ler döndürülemiyorsa:

  - HTTP `500` yanıtlar.
  - Şu JSON'u döndürür: `{ message: "Girilen ID'li gönderi bulunamadı." }`.

### Veritabanı Kalıcılığı Yardımcıları

`data` klasörü, test `posts` ile doldurulmuş bir veritabanı içerir.

Veritabanı erişimi `api/posts` klasörü içerisinde yer alan `posts-model.js` dosyası kullanılarak yapılacaktır:

- `find()`: find çağrısı, veritabanında bulunan tüm `postların` bir dizisine çözümlenen bir Promise döndürür.
- `findById()`: bu yöntem, tek argüman olarak bir `id` bekler ve sağlanan `id` veya `undefined`a karşılık gelen gönderiyi çözümleyen bir söz verir, eğer o `id` ile gönderi bulunmazsa.
- `insert()`: onu bir 'post' nesnesinden geçirerek insert'i çağırmak, onu veritabanına ekleyecek ve eklenen gönderinin 'id' ile bir nesneye çözümlenen bir Promise döndürecektir. Nesne şöyle görünür: `{ id: 123 }`.
- `update()`: iki bağımsız argüman kabul eder, ilki güncellenecek gönderinin "id"si ve ikincisi uygulanacak "değişikliklere" sahip bir nesnedir. Güncellenen kayıtların sayısını çözümleyen bir Promise döndürür. Sayı 1 ise, kaydın doğru bir şekilde güncellendiği anlamına gelir.
- `remove()`: remove yöntemi, ilk bağımsız değişkeni olarak bir "id" kabul eder ve gönderiyi veritabanından başarıyla sildikten sonra, silinen kayıt sayısına çözümlenen bir Promise verir.
- `findPostComments()`: findPostComments, ilk bağımsız değişkeni olarak bir "postId" kabul eder ve gönderi kimliğiyle ilişkili gönderideki tüm yorumların bir dizisini çözen bir Promise verir.

### Blog Post Şeması

Veritabanındaki bir Blog Gönderisi aşağıdaki yapıya sahiptir:

```js
{
  title: "The post title", // String, required
  contents: "The post contents", // String, required
  created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
  updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
}
```

### Yorum Şeması

Veritabanındaki bir Yorum aşağıdaki yapıya sahiptir:

```js
{
  text: "The text of the comment", // String, required
  post_id: "The id of the associated post", // Integer, required, must match the id of a post entry in the database
  created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
  updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
}
```

#### Önemli Notlar

- `npm run resetdb` komutunu çalıştırarak veritabanını sıfırlayabilirsiniz.
- Postman veya HTTPie kullanarak çalışmanızı manuel olarak test edin. "npm test" komutuyla otomatik testleri çalıştırın.
- Ek dosyalar oluşturabilirsiniz ancak **mevcut dosyaları veya klasörleri taşımayın veya yeniden adlandırmayın**.
- Ek kitaplıklar yüklemek veya ek komut dosyaları eklemek dışında `package.json` dosyanızı değiştirmeyin. **Mevcut kütüphaneleri güncellemeyin**.
- Uygulamanızda en iyi yöntemleri izlemeniz ve temiz ve profesyonel kodlar yazmanız önemlidir.

### Görev 3: Esnek Görevler

`cors` ara yazılımını etkinleştirmeniz gerekecek:

- `cors` npm modulünü ekleyin: `npm i cors`.
- `server.use(express.json())` arkasına `server.use(cors())` ekleyin.
