-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: alex_rivera
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `about_update`
--

DROP TABLE IF EXISTS `about_update`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_update` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text,
  `subtitle` text,
  `position` text,
  `position_desc` text,
  `image` text,
  `name` text,
  `email` text,
  `location` text,
  `freelance` text,
  `projects_completed` text,
  `happy_clients` text,
  `awards_won` text,
  `years_experience` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_update`
--

LOCK TABLES `about_update` WRITE;
/*!40000 ALTER TABLE `about_update` DISABLE KEYS */;
INSERT INTO `about_update` VALUES (1,'Creative Developer & UI/UX  New','Turning Ideas Into Reality New','Creative Developer & UI/UX Designer New','I am a passionate creative developer specializing in creating modern, responsive and user-friendly websites and applications. ','1784482883479cat1.png','Alex Rivera New','email@example.com new','Maharashtra new','Not Available new','30','1','100','1');
/*!40000 ALTER TABLE `about_update` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blog_img` text,
  `blog_date` text,
  `blog_name` text,
  `blog_desc` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES (1,'1784481597673dog1.png','June 15, 2025','Building Scalable Web Applications in 2025 New','Explore best practices and modern tools for creating robust, scalable web apps. New'),(2,'1784478590954Cat.png','March 22, 2026','Designing for Accessibility: Why It Matters','Inclusive design principles that improve user experience for everyone.'),(3,'1784483227339bear(png).png','March 22, 2026','Designing for Accessibility: Why It Matters New','Explore best practices and modern tools for creating robust, scalable web apps.');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `email` text,
  `phone` text,
  `address` text,
  `logo` text,
  `map` text,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'sk@gmail.com','123456789456','nagar','1784176491806Screenshot 2026-07-16 093116.png','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30767694.11883084!2d60.92944751922805!3d19.72019948337311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1784174392043!5m2!1sen!2sin');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_form`
--

DROP TABLE IF EXISTS `contact_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_form` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `c_name` text,
  `c_email` text,
  `c_subject` text,
  `c_message` text,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_form`
--

LOCK TABLES `contact_form` WRITE;
/*!40000 ALTER TABLE `contact_form` DISABLE KEYS */;
INSERT INTO `contact_form` VALUES (1,'Saurabh Karale','saurabh@1324gmail.com','Software Developer','Hi Hello Namaste !'),(2,'Saurabh Karale','sk@gmail.com','Application for Website Developer Position','Hi Hello Namste !'),(4,'Shubham Shewale','shubham@gmail.com','Web Developer','Hi My name is Shubham nice to meet you');
/*!40000 ALTER TABLE `contact_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `eid` int NOT NULL AUTO_INCREMENT,
  `edu_duration` text,
  `edu_position` text,
  `edu_company` text,
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (1,'2021-2024','BCA','New Arts College'),(5,'2021-2027','BCA','New Arts College'),(6,'2021-2024','BCA','New Arts College'),(7,'2021-2024','BCA','New Arts College');
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience` (
  `eid` int NOT NULL AUTO_INCREMENT,
  `exp_duration` text,
  `exp_position` text,
  `exp_company` text,
  `exp_desc` text,
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience`
--

LOCK TABLES `experience` WRITE;
/*!40000 ALTER TABLE `experience` DISABLE KEYS */;
INSERT INTO `experience` VALUES (1,'2020 - 2022','Front-End Developer','TechStart Studio','Built responsive, user-centric interfaces for diverse client portfolios.'),(8,'2022 - 2026','Full Stack Developer','New Arts Commerce & Science College','Fresher '),(9,'2022 - 2026','Full Stack Developer','New Arts Commerce & Science College','Fresher ');
/*!40000 ALTER TABLE `experience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_update`
--

DROP TABLE IF EXISTS `home_update`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_update` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `description` text,
  `image` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_update`
--

LOCK TABLES `home_update` WRITE;
/*!40000 ALTER TABLE `home_update` DISABLE KEYS */;
INSERT INTO `home_update` VALUES (1,'Saurabh Kisan Karale','Hii Hello Namaste Saurabh','1784482844314bear(png).png');
/*!40000 ALTER TABLE `home_update` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `lid` int NOT NULL AUTO_INCREMENT,
  `username` text,
  `password` text,
  PRIMARY KEY (`lid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'root@gmail.com','root'),(2,'admin@gmail.com','admin');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `pro_img` text,
  `pro_name` text,
  `pro_position` text,
  `pro_logo` text,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'1784481481558dog1.png','Developer','12212','bi bi-code12'),(2,'1784475598165car.avif','Full Stack Development','Senior manager','bi bi-code'),(4,'1784483076382dog1.png','Full Stack Development New','Fresher','bi bi-code'),(6,'1784483119366Cat.png','Web Devlopment','Junier Developer','bi bi-code');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `ser_logo` text,
  `ser_position` text,
  `ser_desc` text,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'bi bi-code-slash','Web Development New','Building responsive, high-performance websites with modern technologies and best practices. New'),(2,'bi bi-window','UI/UX Design','Designing intuitive interfaces that deliver exceptional user experiences across all devices.'),(3,'bi bi-globe','Mobile Apps','Creating native and cross-platform mobile applications with smooth performance and beautiful UI.');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social`
--

DROP TABLE IF EXISTS `social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `facebook` text,
  `twitter` text,
  `instagram` text,
  `linkedin` text,
  `github` text,
  `youtube` text,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social`
--

LOCK TABLES `social` WRITE;
/*!40000 ALTER TABLE `social` DISABLE KEYS */;
INSERT INTO `social` VALUES (1,'https://facebook.com','https://twitter.com','https://instagram.com','https://linkedin.com','https://github.com','https://youtube.com');
/*!40000 ALTER TABLE `social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technical_skills`
--

DROP TABLE IF EXISTS `technical_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technical_skills` (
  `ts_id` int NOT NULL AUTO_INCREMENT,
  `tech_name` text,
  `tect_per` text,
  PRIMARY KEY (`ts_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technical_skills`
--

LOCK TABLES `technical_skills` WRITE;
/*!40000 ALTER TABLE `technical_skills` DISABLE KEYS */;
INSERT INTO `technical_skills` VALUES (1,'HTML5 & CSS3','95'),(2,'JavaScript (ES6+)','88'),(3,'React.js','80'),(4,'UI/UX Design','92'),(5,'WordPress','75'),(8,'Nodejs','100');
/*!40000 ALTER TABLE `technical_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `test_star` text,
  `test_desc` text,
  `test_img` text,
  `test_name` text,
  `test_position` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,'5 Star','\"Alex brought our complex project to life with his technical expertise and creative problem-solving. A true professional.\"','1784481553044Cat.png','Sarah Johnson News','Product Manager, DesignStudio New'),(2,'5 Star','\"Alex brought our complex project to life with his technical expertise and creative problem-solving. A true professional.\"','1784483157169dog1.png','John Smith New','CEO'),(4,'10 Star','\"Alex brought our complex project to life with his technical expertise and creative problem-solving. A true professional.\"','image.jpg','John Smith New','Product Manager, DesignStudio New');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-20  8:07:35
