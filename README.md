# Docker Horizontal Scaling (Monolith)

Berikut adalah cara membuat replikasi container untuk aplikasi monolith anda menggunakan docker, cara yang saya gunakan ini adalah membuat aplikasi service container menjadi ClusterIP seperti ketika menggunakan Kubernetes, yang dimana service container hanya bisa di akses dari dalam dan tidak bisa di akses dari luar, jadi agar service container aplikasi tersebut bisa di akses dari luar container, kita perlu yang namanya itu ingress (proxy) untuk mengakses service container aplikasi tersebut, konsepnya hampir sama seperti menggunakan kubernetes cek tutorial saya lainnya [disini](https://github.com/restuwahyu13/express-microservices) terkait kubernetes.

## Benefit Strength & Weakness

- Strength - Mendistribusikan trafic ke masing - masing replikasi dengan load balancer
- Strength - Menghandle terjadinya crash, maksudnya ketika salah satu aplikasi mati, aplikasi masih tetap bisa digunakan karena masih ada replikasi lainnya yang menyala
- Weakness - Pengunaan CPU & RAM sedikit meningkat
- Etc
