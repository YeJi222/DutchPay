# 🌱 서비스 이용방법
![ManualPage](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=Manual&fontSize=90)

## 🎈 First Page (Login Page)
<img width="1083" alt="image" src="https://github.com/YeJi222/DutchPay/assets/70511859/0413f628-a98a-4123-a15c-cd3555e828d9">
<ul>
  <li> Login 토글 버튼 -> Login을 한 후, Dutch Pay System을 사용할 수 있습니다. </li>
  <li> Sign Up 토글 버튼 -> 회원가입을 할 수 있는 페이지로 이동합니다. </li>
</ul>

## 🎈 Register Page
<img width="1087" alt="image" src="https://github.com/YeJi222/DutchPay/assets/70511859/d2bbe31d-e1c8-4aa0-b8fc-16002cbb5712">
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


2023.05.27.토 ~ 



## 💊 Trouble Shooting    
### 1. Parameter 0 of constructor in com.dutchpay.dp.data.dao.Impl.UserDAOImpl required a bean of type 'com.dutchpay.dp.data.repository.UserRepository' that could not be found. 에러
-> pom.xml dependency 추가 필요

```xml
<dependency> <!-- jpa dependncy 추가 -->
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

(+) mariadb dependency도 추가 시켜주어야 추가적인 에러가 발생하지 않는다
```xml
<dependency>
  <groupId>org.mariadb.jdbc</groupId>
  <artifactId>mariadb-java-client</artifactId>
</dependency>
```

### 2. Error executing DDL 에러   
-> group 테이블을 생성하려고 하는데, group이 예약어여서 발생한 에러   
-> group을 groups로 바꾸니 테이블이 에러 없이 잘 생성되었다   
(+) application.properties 파일에 jpa관련 설정만 해주면, repository 생성 전에 Entity만 생성해주어도 create table이 가능    
```properties
  ## JPA
  spring.jpa.hibernate.ddl-auto=create
  spring.jpa.show-sql=true
```

### 3. java.lang.ClassNotFoundException: org.springframework.data.domain.ScrollPosition 에러    
jpa 버전을 마음대로 바꾸면 안된다..! 3.0.3버전을 최신 버저인 3.1.0으로 바꾸면서 생긴 에러   
스프링 부트와 스프링 데이터 JPA 버전 간에 호환성이 있어야 정상적으로 작동한다    
일치하지 않는 버전을 사용할 경우 클래스를 찾을 수 없는 ClassNotFoundException이 발생

```xml
<dependency>
  <groupId>org.springframework.data</groupId>
  <artifactId>spring-data-jpa</artifactId>
  <version>3.1.0</version> <!-- 3.0.3 버전에서 3.1.0으로 업그레이드 시켜 주면서 발생한 에러 -->
</dependency>
```

### 4. 리액트에서 useNavigate() may be used only in the context of a \<Router> component. 에러    
-> App.js에서 Routes 컴포넌트를 사용하여 경로에 따라 컴포넌트를 렌더링하도록 해야 한다   

## Reference  
1. sweetalert2    
https://sweetalert2.github.io/#usage
