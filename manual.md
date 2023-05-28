# 🌱 서비스 이용방법
![ManualPage](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=Manual&fontSize=90)

## 🎈 First Page (Login Page)
<img width="764" alt="image" src="https://user-images.githubusercontent.com/70511859/224049213-bbfc5e65-13dd-4267-9833-9af7bb14d001.png">
<ul>
  <li> Login 버튼 -> Login을 한 후, Dutch Pay System을 사용할 수 있습니다. </li>
  <li> Register 버튼 -> 회원가입을 할 수 있는 페이지로 이동합니다. </li>
</ul>

## 🎈 Register Page
<img width="767" alt="image" src="https://user-images.githubusercontent.com/70511859/224051166-30e0a481-7858-458d-a740-c57735671cd3.png">
<ul>
  <li> 새로 가입할 아이디와 비밀번호, 계좌번호, 전화번호를 입력받게 하고 Register 버튼을 누르면 회원가입을 할 수 있습니다. </li>
  <li> 빈칸이 있으면 회원가입 처리를 하지 않고, 사용자가 다시 한 번 확인할 수 있도록 안내합니다.</li>
  <li> 서비스에 이미 가입한 경우, 손가락 모양의 이전 버튼을 누르면 로그인 화면으로 이동할 수 있습니다. </li>
</ul>

## 🎈 Home Page (After Login)
<img width="766" alt="image" src="https://user-images.githubusercontent.com/70511859/224052348-88f307b1-646e-4a82-bfd1-5ee6ec050ee3.png">
<ul>
  <li> 처음 로그인을 하면 볼 수 있는 Home Page 입니다. </li>
  <li> 로그인이 된 상태이므로 상단에 로그인된 ID와 Logout 버튼이 뜨게 되고, 이 버튼을 누르면 로그아웃되어 로그인 전에 접속할 수 있는 첫 페이지로 이동하게 됩니다. </li>
  <li>  </li>
  <li>  </li>
</ul>






## 💊 Trouble Shooting    
1. Parameter 0 of constructor in com.dutchpay.dp.data.dao.Impl.UserDAOImpl required a bean of type 'com.dutchpay.dp.data.repository.UserRepository' that could not be found. 에러
-> pom.xml dependency 추가 필요

```xml
<dependency> <!-- jpa dependncy 추가 -->
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.data</groupId>
  <artifactId>spring-data-jpa</artifactId>
  <version>3.1.0</version> <!-- 3.0.3 버전에서 3.1.0으로 업그레이드 시켜줌 -->
</dependency>
```
(+) mariadb dependency도 추가 시켜주어야 추가적인 에러가 발생하지 않는다
```xml
<dependency>
  <groupId>org.mariadb.jdbc</groupId>
  <artifactId>mariadb-java-client</artifactId>
</dependency>
```
