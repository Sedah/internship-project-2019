-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: examination
-- ------------------------------------------------------
-- Server version	5.7.21-log

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
-- Table structure for table `account_emailaddress`
--

DROP TABLE IF EXISTS `account_emailaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailaddress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `account_emailaddress_user_id_2c513194_fk_auth_user_id` (`user_id`),
  CONSTRAINT `account_emailaddress_user_id_2c513194_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailaddress`
--

LOCK TABLES `account_emailaddress` WRITE;
/*!40000 ALTER TABLE `account_emailaddress` DISABLE KEYS */;
INSERT INTO `account_emailaddress` VALUES (1,'Test1@gmail.com',0,1,1),(2,'Test2@gmail.com',0,1,2),(3,'Test3@gmail.com',0,1,3),(4,'Test4@gmail.com',0,1,4),(5,'phensiritn1@gmail.com',0,1,5);
/*!40000 ALTER TABLE `account_emailaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_emailconfirmation`
--

DROP TABLE IF EXISTS `account_emailconfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailconfirmation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `sent` datetime(6) DEFAULT NULL,
  `key` varchar(64) NOT NULL,
  `email_address_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` (`email_address_id`),
  CONSTRAINT `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` FOREIGN KEY (`email_address_id`) REFERENCES `account_emailaddress` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailconfirmation`
--

LOCK TABLES `account_emailconfirmation` WRITE;
/*!40000 ALTER TABLE `account_emailconfirmation` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailconfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add Token',7,'add_token'),(26,'Can change Token',7,'change_token'),(27,'Can delete Token',7,'delete_token'),(28,'Can view Token',7,'view_token'),(29,'Can add site',8,'add_site'),(30,'Can change site',8,'change_site'),(31,'Can delete site',8,'delete_site'),(32,'Can view site',8,'view_site'),(33,'Can add social account',9,'add_socialaccount'),(34,'Can change social account',9,'change_socialaccount'),(35,'Can delete social account',9,'delete_socialaccount'),(36,'Can view social account',9,'view_socialaccount'),(37,'Can add social application',10,'add_socialapp'),(38,'Can change social application',10,'change_socialapp'),(39,'Can delete social application',10,'delete_socialapp'),(40,'Can view social application',10,'view_socialapp'),(41,'Can add social application token',11,'add_socialtoken'),(42,'Can change social application token',11,'change_socialtoken'),(43,'Can delete social application token',11,'delete_socialtoken'),(44,'Can view social application token',11,'view_socialtoken'),(45,'Can add email address',12,'add_emailaddress'),(46,'Can change email address',12,'change_emailaddress'),(47,'Can delete email address',12,'delete_emailaddress'),(48,'Can view email address',12,'view_emailaddress'),(49,'Can add email confirmation',13,'add_emailconfirmation'),(50,'Can change email confirmation',13,'change_emailconfirmation'),(51,'Can delete email confirmation',13,'delete_emailconfirmation'),(52,'Can view email confirmation',13,'view_emailconfirmation'),(53,'Can add exam',14,'add_exam'),(54,'Can change exam',14,'change_exam'),(55,'Can delete exam',14,'delete_exam'),(56,'Can view exam',14,'view_exam'),(57,'Can add subject',15,'add_subject'),(58,'Can change subject',15,'change_subject'),(59,'Can delete subject',15,'delete_subject'),(60,'Can view subject',15,'view_subject'),(61,'Can add exam_ question',16,'add_exam_question'),(62,'Can change exam_ question',16,'change_exam_question'),(63,'Can delete exam_ question',16,'delete_exam_question'),(64,'Can view exam_ question',16,'view_exam_question'),(65,'Can add exam_ choice',17,'add_exam_choice'),(66,'Can change exam_ choice',17,'change_exam_choice'),(67,'Can delete exam_ choice',17,'delete_exam_choice'),(68,'Can view exam_ choice',17,'view_exam_choice'),(69,'Can add assign_ exam',18,'add_assign_exam'),(70,'Can change assign_ exam',18,'change_assign_exam'),(71,'Can delete assign_ exam',18,'delete_assign_exam'),(72,'Can view assign_ exam',18,'view_assign_exam'),(73,'Can add image',19,'add_image'),(74,'Can change image',19,'change_image'),(75,'Can delete image',19,'delete_image'),(76,'Can view image',19,'view_image'),(77,'Can add topic',20,'add_topic'),(78,'Can change topic',20,'change_topic'),(79,'Can delete topic',20,'delete_topic'),(80,'Can view topic',20,'view_topic'),(81,'Can add user_ attempt',21,'add_user_attempt'),(82,'Can change user_ attempt',21,'change_user_attempt'),(83,'Can delete user_ attempt',21,'delete_user_attempt'),(84,'Can view user_ attempt',21,'view_user_attempt'),(85,'Can add user_ attempt_ detail',22,'add_user_attempt_detail'),(86,'Can change user_ attempt_ detail',22,'change_user_attempt_detail'),(87,'Can delete user_ attempt_ detail',22,'delete_user_attempt_detail'),(88,'Can view user_ attempt_ detail',22,'view_user_attempt_detail'),(89,'Can add profile',23,'add_profile'),(90,'Can change profile',23,'change_profile'),(91,'Can delete profile',23,'delete_profile'),(92,'Can view profile',23,'view_profile');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$150000$1EmGrLKp4NN6$7SghJX6zIg0JZDZKWHtNlLtUQeUFYc4b1gM/DjRqtT4=','2019-10-17 02:03:21.943742',0,'visarut_test_role_1','Test1','Test1','Test1@gmail.com',0,1,'2019-10-17 02:03:21.720881'),(2,'pbkdf2_sha256$150000$1ZNLGrC8QIzD$Drp7HFZNrN8e39ml6OFOgGWuAwiq0nlVGD5ZqBO1vLE=','2019-10-17 04:44:53.547761',0,'visarut_test_role_2','Test2','Test2','Test2@gmail.com',0,1,'2019-10-17 04:44:53.319901'),(3,'pbkdf2_sha256$150000$bNvAukvF2q07$M62N93MUnxy0PXx5wig0Wie/WK52aTwsrLJjnYv/Xlw=','2019-10-17 04:45:02.515884',0,'visarut_test_role_3','Test3','Test3','Test3@gmail.com',0,1,'2019-10-17 04:45:02.317984'),(4,'pbkdf2_sha256$150000$dNUEOWSoBe2h$TzPUqaIniD7ThGcc8pAcRxOeM3a7agiU0hazPff2dO8=','2019-10-17 04:45:11.032206',0,'visarut_test_role_4','Test4','Test4','Test4@gmail.com',0,1,'2019-10-17 04:45:10.818339'),(5,'pbkdf2_sha256$150000$q5sgdzOPJFAD$QngFRrt/9zAROZZgJ2v4iAWHq4kxNkViVJ8/tbi9dkM=','2019-10-17 05:12:08.778549',0,'Sedah','Phensiri','Kittikhirichaikun','phensiritn1@gmail.com',0,1,'2019-10-17 04:45:43.692299');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES ('07c8ba6671c128322c07812cd014c0c25f20e816','2019-10-17 04:45:02.503791',3),('2c0538605c89ec89b2f842a76c98070119040a02','2019-10-17 04:45:43.893176',5),('5f8b168758a2faa4798ebdb96ab9abfb200f5688','2019-10-17 04:44:53.530770',2),('be7f9b90c4ec0f9c677a8201a8f20b3aadf0a965','2019-10-17 04:45:11.017215',4),('caf184b8ede3e4ce32367a4feb0688f06c0fe934','2019-10-17 02:03:21.927752',1);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_user_profile`
--

DROP TABLE IF EXISTS `custom_user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_user_profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_on` datetime(6) NOT NULL,
  `update_on` datetime(6) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_user_profile`
--

LOCK TABLES `custom_user_profile` WRITE;
/*!40000 ALTER TABLE `custom_user_profile` DISABLE KEYS */;
INSERT INTO `custom_user_profile` VALUES (1,1,'Test1','Test1','Test1@gmail.com','2019-10-17 02:03:21.906765','2019-10-17 02:03:21.906765','Admin'),(2,2,'Test2','Test2','Test2@gmail.com','2019-10-17 04:44:53.505786','2019-10-17 04:47:47.826895','Instructor'),(3,3,'Test3','Test3','Test3@gmail.com','2019-10-17 04:45:02.490001','2019-10-17 04:45:02.490001','Employee'),(4,4,'Test4','Test4','Test4@gmail.com','2019-10-17 04:45:10.997228','2019-10-17 04:45:10.997228','Employee'),(5,NULL,'Phensiri','Kittikhirichaikun','phensiritn1@gmail.com','2019-10-17 04:45:43.881183','2019-10-17 04:45:43.881183','Guest');
/*!40000 ALTER TABLE `custom_user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (12,'account','emailaddress'),(13,'account','emailconfirmation'),(1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(7,'authtoken','token'),(5,'contenttypes','contenttype'),(23,'custom_user','profile'),(18,'exam','assign_exam'),(14,'exam','exam'),(17,'exam','exam_choice'),(16,'exam','exam_question'),(19,'exam','image'),(15,'exam','subject'),(20,'exam','topic'),(21,'exam','user_attempt'),(22,'exam','user_attempt_detail'),(6,'sessions','session'),(8,'sites','site'),(9,'socialaccount','socialaccount'),(10,'socialaccount','socialapp'),(11,'socialaccount','socialtoken');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2019-10-17 02:02:03.076707'),(2,'auth','0001_initial','2019-10-17 02:02:03.319856'),(3,'account','0001_initial','2019-10-17 02:02:04.065279'),(4,'account','0002_email_max_length','2019-10-17 02:02:04.400277'),(5,'admin','0001_initial','2019-10-17 02:02:04.457242'),(6,'admin','0002_logentry_remove_auto_add','2019-10-17 02:02:04.616693'),(7,'admin','0003_logentry_add_action_flag_choices','2019-10-17 02:02:04.633684'),(8,'contenttypes','0002_remove_content_type_name','2019-10-17 02:02:04.773597'),(9,'auth','0002_alter_permission_name_max_length','2019-10-17 02:02:04.859544'),(10,'auth','0003_alter_user_email_max_length','2019-10-17 02:02:04.949489'),(11,'auth','0004_alter_user_username_opts','2019-10-17 02:02:04.967476'),(12,'auth','0005_alter_user_last_login_null','2019-10-17 02:02:05.046427'),(13,'auth','0006_require_contenttypes_0002','2019-10-17 02:02:05.055423'),(14,'auth','0007_alter_validators_add_error_messages','2019-10-17 02:02:05.078408'),(15,'auth','0008_alter_user_username_max_length','2019-10-17 02:02:05.178347'),(16,'auth','0009_alter_user_last_name_max_length','2019-10-17 02:02:05.328253'),(17,'auth','0010_alter_group_name_max_length','2019-10-17 02:02:05.417232'),(18,'auth','0011_update_proxy_permissions','2019-10-17 02:02:05.435222'),(19,'authtoken','0001_initial','2019-10-17 02:02:05.486235'),(20,'authtoken','0002_auto_20160226_1747','2019-10-17 02:02:05.681015'),(21,'custom_user','0001_initial','2019-10-17 02:02:05.784644'),(22,'custom_user','0002_auto_20191015_1434','2019-10-17 02:02:06.216329'),(23,'exam','0001_initial','2019-10-17 02:02:06.692218'),(24,'exam','0002_auto_20191015_1434','2019-10-17 02:02:08.717500'),(25,'exam','0003_auto_20191017_0901','2019-10-17 02:02:09.548033'),(26,'sessions','0001_initial','2019-10-17 02:02:09.594412'),(27,'sites','0001_initial','2019-10-17 02:02:09.665930'),(28,'sites','0002_alter_domain_unique','2019-10-17 02:02:09.703887'),(29,'socialaccount','0001_initial','2019-10-17 02:02:09.956923'),(30,'socialaccount','0002_token_max_lengths','2019-10-17 02:02:10.510905'),(31,'socialaccount','0003_extra_data_default_dict','2019-10-17 02:02:10.541886');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('0hfjw8f2egecas5nlllodx31e0t6hxvr','MjE5MDNmNDczMzBkYTRhZDU0MGViZjE2M2E0ZjA3M2M1Yzk0ODMzMzp7Il9hdXRoX3VzZXJfaWQiOiI1IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIxNDNmM2FmMGY1MTBkMWMzMzk4M2UzYjJjMWIwN2ZhZmU0N2VmNWE0In0=','2019-10-31 05:12:08.788542'),('13gy37jes88oz03hdnjeio8s7ia2esmf','OWU2NjcxNDVmOTVlMTkzNTgyMjQ3ODQ5NTI5M2Q0ODE1YTY2M2VhNzp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsIl9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIyMTdmM2QzYTgxZmY5ZTY2MDMzNWU1Zjk2NmZmNGQ0MDkyYjc4ODZjIn0=','2019-10-31 04:45:11.051194'),('2gv3cco3x3cwyjrm4or2etkqs30ysiu3','NDdjZTI2ZGU0Y2I3NzRhOTI1YzY3MDkzN2JjMTNmMDk0NDJiZWVlMDp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsIl9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJhZTQ3NWYwNWFjNGYxY2I1M2UyNWJlZmZmZDk2YTJlYTgyZmYwMDIxIn0=','2019-10-31 04:45:02.532869'),('2q121792jyun33b6172fmrvp860sy5el','MDk0MjYxNzc2MThhM2I1ZGI1NzY1MDkzZWRkODNiYjgyZGE4OTIxYzp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsIl9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzN2ZmMmVlM2ZkYzZkNzcxOTI0YjEzNDgzZjFkYzg0YWFlNDhlYjE3In0=','2019-10-31 04:44:53.600727'),('2z690a3uuc8lw0ug6947ev4f8mwg3di3','Y2RjNWE1NjFkYWY1NTg4MmQwYzc1NDQ4Y2JjMzlmZWZhMTI5NTdkZDp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsIl9hdXRoX3VzZXJfaWQiOiI1IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIxNDNmM2FmMGY1MTBkMWMzMzk4M2UzYjJjMWIwN2ZhZmU0N2VmNWE0In0=','2019-10-31 04:45:43.922157'),('a5wg8cmdxp3gd94mmyjprv9irot510r5','MjE5MDNmNDczMzBkYTRhZDU0MGViZjE2M2E0ZjA3M2M1Yzk0ODMzMzp7Il9hdXRoX3VzZXJfaWQiOiI1IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIxNDNmM2FmMGY1MTBkMWMzMzk4M2UzYjJjMWIwN2ZhZmU0N2VmNWE0In0=','2019-10-31 04:48:02.085996'),('me6n3h9ffre24kvew91bnkz2ljoqa47o','ZWRmZmFiMjM0NWRhNTUwZmJlMzFhMjUzNzQ1MDJlZTk1MzQxZGY0Mjp7ImFjY291bnRfdmVyaWZpZWRfZW1haWwiOm51bGwsIl9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjY2NjNTQ5ZmY3MzUzMTM3MDc4NTkxY2FjMWQ3MTAwODIxODdjZmVmIn0=','2019-10-31 02:03:22.211578');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_site_domain_a2e37b91_uniq` (`domain`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES (1,'example.com','example.com');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_assign_exam`
--

DROP TABLE IF EXISTS `exam_assign_exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_assign_exam` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assigned_on` datetime(6) DEFAULT NULL,
  `assign_exam_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `exam_assign_exam_assign_exam_id_user_id_61517946_uniq` (`assign_exam_id`,`user_id`),
  KEY `exam_assign_exam_user_id_599b18f1_fk_auth_user_id` (`user_id`),
  CONSTRAINT `exam_assign_exam_assign_exam_id_bdcfe74b_fk_exam_exam_exam_id` FOREIGN KEY (`assign_exam_id`) REFERENCES `exam_exam` (`exam_id`),
  CONSTRAINT `exam_assign_exam_user_id_599b18f1_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_assign_exam`
--

LOCK TABLES `exam_assign_exam` WRITE;
/*!40000 ALTER TABLE `exam_assign_exam` DISABLE KEYS */;
INSERT INTO `exam_assign_exam` VALUES (1,'2019-10-17 05:11:56.161943',10,5);
/*!40000 ALTER TABLE `exam_assign_exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_exam`
--

DROP TABLE IF EXISTS `exam_exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_exam` (
  `exam_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `total_people_try` int(11) NOT NULL,
  `total_question` int(11) NOT NULL,
  `created_on` datetime(6) NOT NULL,
  `update_on` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_public` tinyint(1) NOT NULL,
  `topic_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`exam_id`),
  KEY `exam_exam_user_id_da9a78f1_fk_auth_user_id` (`user_id`),
  KEY `exam_exam_topic_id_86fbd8a2_fk_exam_topic_topic_id` (`topic_id`),
  CONSTRAINT `exam_exam_topic_id_86fbd8a2_fk_exam_topic_topic_id` FOREIGN KEY (`topic_id`) REFERENCES `exam_topic` (`topic_id`),
  CONSTRAINT `exam_exam_user_id_da9a78f1_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_exam`
--

LOCK TABLES `exam_exam` WRITE;
/*!40000 ALTER TABLE `exam_exam` DISABLE KEYS */;
INSERT INTO `exam_exam` VALUES (3,'TEST ENGLISH',1,10,'2019-10-17 04:03:14.453899','2019-10-17 04:03:14.453899',1,1,1),(4,'แบบทดสอบ',0,6,'2019-10-17 04:13:14.875163','2019-10-17 04:13:14.875163',1,1,5),(5,'Python Question',0,3,'2019-10-17 04:23:57.384636','2019-10-17 04:23:57.384636',1,1,4),(10,'Refer to the following advertisement and e-mail.',0,5,'2019-10-17 04:41:43.272004','2019-10-17 04:41:43.272004',1,0,1);
/*!40000 ALTER TABLE `exam_exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_exam_choice`
--

DROP TABLE IF EXISTS `exam_exam_choice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_exam_choice` (
  `choice_id` int(11) NOT NULL AUTO_INCREMENT,
  `choice` longtext NOT NULL,
  `correct_answer` tinyint(1) NOT NULL,
  `explaination` longtext,
  `created_on` datetime(6) NOT NULL,
  `update_on` datetime(6) NOT NULL,
  `question_id` int(11) NOT NULL,
  PRIMARY KEY (`choice_id`),
  KEY `exam_exam_choice_question_id_110e291b_fk_exam_exam` (`question_id`),
  CONSTRAINT `exam_exam_choice_question_id_110e291b_fk_exam_exam` FOREIGN KEY (`question_id`) REFERENCES `exam_exam_question` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_exam_choice`
--

LOCK TABLES `exam_exam_choice` WRITE;
/*!40000 ALTER TABLE `exam_exam_choice` DISABLE KEYS */;
INSERT INTO `exam_exam_choice` VALUES (4,'complication',0,'','2019-10-17 04:03:59.785151','2019-10-17 04:03:59.785151',3),(5,'complicates',0,'','2019-10-17 04:03:59.789147','2019-10-17 04:03:59.789147',3),(6,'complicate',0,'','2019-10-17 04:03:59.793146','2019-10-17 04:03:59.793146',3),(7,'complicated',1,'','2019-10-17 04:03:59.802141','2019-10-17 04:03:59.802141',3),(8,'despite',0,'','2019-10-17 04:04:44.053830','2019-10-17 04:04:44.053830',4),(9,'except',0,'','2019-10-17 04:04:44.063824','2019-10-17 04:04:44.063824',4),(10,'since',1,'','2019-10-17 04:04:44.067822','2019-10-17 04:04:44.067822',4),(11,'during',0,'','2019-10-17 04:04:44.075816','2019-10-17 04:04:44.075816',4),(12,'regular',0,'','2019-10-17 04:05:18.769654','2019-10-17 04:05:18.769654',5),(13,'regularity',0,'','2019-10-17 04:05:18.773651','2019-10-17 04:05:18.773651',5),(14,'regulate',0,'','2019-10-17 04:05:18.776649','2019-10-17 04:05:18.776649',5),(15,'regularly',1,'','2019-10-17 04:05:18.780647','2019-10-17 04:05:18.780647',5),(16,'who',0,'','2019-10-17 04:06:24.826520','2019-10-17 04:06:24.826520',6),(17,'whose',0,'','2019-10-17 04:06:24.837515','2019-10-17 04:06:24.837515',6),(18,'they',0,'','2019-10-17 04:06:24.841511','2019-10-17 04:06:24.841511',6),(19,'those',1,'','2019-10-17 04:06:24.849507','2019-10-17 04:06:24.849507',6),(20,'immediate',0,'','2019-10-17 04:07:04.929988','2019-10-17 04:07:04.929988',7),(21,'synthetic',1,'','2019-10-17 04:07:04.933985','2019-10-17 04:07:04.933985',7),(22,'reasonable',0,'','2019-10-17 04:07:04.942980','2019-10-17 04:07:04.942980',7),(23,'assumed',0,'','2019-10-17 04:07:04.946977','2019-10-17 04:07:04.946977',7),(24,'taking on',1,'','2019-10-17 04:07:36.935219','2019-10-17 04:07:36.935219',8),(25,'taking in',0,'','2019-10-17 04:07:36.943214','2019-10-17 04:07:36.943214',8),(26,'take on',0,'','2019-10-17 04:07:36.952208','2019-10-17 04:07:36.952208',8),(27,'getting up',0,'','2019-10-17 04:07:36.956207','2019-10-17 04:07:36.956207',8),(28,'delivering',0,'','2019-10-17 04:08:14.839641','2019-10-17 04:08:14.839641',9),(29,'delivered',1,'','2019-10-17 04:08:14.843640','2019-10-17 04:08:14.843640',9),(30,'to deliver',0,'','2019-10-17 04:08:14.852635','2019-10-17 04:08:14.852635',9),(31,'to be deliver',0,'','2019-10-17 04:08:14.856632','2019-10-17 04:08:14.856632',9),(32,'during the last',1,'','2019-10-17 04:08:53.867397','2019-10-17 04:08:53.867397',10),(33,'in the following',0,'','2019-10-17 04:08:53.878391','2019-10-17 04:08:53.878391',10),(34,'periodically over',0,'','2019-10-17 04:08:53.887386','2019-10-17 04:08:53.887386',10),(35,'since the last',0,'','2019-10-17 04:08:53.890383','2019-10-17 04:08:53.890383',10),(36,'make',0,'','2019-10-17 04:09:26.012938','2019-10-17 04:09:26.012938',11),(37,'are at least',0,'','2019-10-17 04:09:26.018932','2019-10-17 04:09:26.018932',11),(38,'account for',1,'','2019-10-17 04:09:26.022931','2019-10-17 04:09:26.022931',11),(39,'are raised by',0,'','2019-10-17 04:09:26.031924','2019-10-17 04:09:26.031924',11),(40,'instrumental',0,'','2019-10-17 04:10:09.734954','2019-10-17 04:10:09.734954',12),(41,'played a big role',1,'','2019-10-17 04:10:09.740951','2019-10-17 04:10:09.740951',12),(42,'played a hand',0,'','2019-10-17 04:10:09.744947','2019-10-17 04:10:09.744947',12),(43,'effectively',0,'','2019-10-17 04:10:09.748944','2019-10-17 04:10:09.748944',12),(56,'How the program will accomplish the task',0,'','2019-10-17 04:20:26.820956','2019-10-17 04:20:26.820956',16),(57,'What the task is that the program must perform',1,'','2019-10-17 04:20:26.828951','2019-10-17 04:20:26.828951',16),(58,'How to divide the task into subtasks',0,'','2019-10-17 04:20:26.832949','2019-10-17 04:20:26.832949',16),(59,'How to test the program when it is done',0,'','2019-10-17 04:20:26.841944','2019-10-17 04:20:26.841944',16),(60,'Outputstream is the abstract superclass of all classes that represent an outputstream of bytes.',1,'','2019-10-17 04:21:15.320959','2019-10-17 04:21:15.321959',17),(61,'Subclasses of the class Reader are used to read character streams.',1,'','2019-10-17 04:21:15.324957','2019-10-17 04:21:15.325956',17),(62,'To write characters to an output stream, you have to make use of the Class Character Output Stream.',0,'','2019-10-17 04:21:15.329952','2019-10-17 04:21:15.329952',17),(63,'To write an object to a file, you use the class objectFileWriter.',0,'','2019-10-17 04:21:15.333952','2019-10-17 04:21:15.333952',17),(64,'Object',0,'','2019-10-17 04:21:57.492517','2019-10-17 04:21:57.492517',18),(65,'System.Net',0,'','2019-10-17 04:21:57.495514','2019-10-17 04:21:57.496516',18),(66,'System.Object',1,'','2019-10-17 04:21:57.499513','2019-10-17 04:21:57.499513',18),(67,'System',0,'','2019-10-17 04:21:57.503511','2019-10-17 04:21:57.503511',18),(68,'System.Root',0,'','2019-10-17 04:21:57.507507','2019-10-17 04:21:57.507507',18),(69,'Aurl=\"http://www.w3schools.com\">W3Schools.com',0,'','2019-10-17 04:22:35.000776','2019-10-17 04:22:35.000776',19),(70,'A href=\"http://www.w3schools.com\">W3Schools',1,'','2019-10-17 04:22:35.008772','2019-10-17 04:22:35.008772',19),(71,'A>http://www.w3schools.com',0,'','2019-10-17 04:22:35.012768','2019-10-17 04:22:35.012768',19),(72,'A name=\"http://www.w3schools.com\">W3Schools.com',0,'','2019-10-17 04:22:35.021764','2019-10-17 04:22:35.021764',19),(73,'Use database command',0,'','2019-10-17 04:23:15.260657','2019-10-17 04:23:15.260657',20),(74,'Create table command',0,'','2019-10-17 04:23:15.264657','2019-10-17 04:23:15.264657',20),(75,'Create database command',1,'','2019-10-17 04:23:15.268653','2019-10-17 04:23:15.268653',20),(76,'Crete store command',0,'','2019-10-17 04:23:15.272650','2019-10-17 04:23:15.272650',20),(77,'abcd',0,'','2019-10-17 04:27:27.626490','2019-10-17 04:27:27.626490',21),(78,'ABCD',0,'','2019-10-17 04:27:27.629489','2019-10-17 04:27:27.629489',21),(79,'error',1,'Explanation: Objects of type int aren’t subscriptable. However, if the statement was x[i], an error would not have been thrown.','2019-10-17 04:27:27.633486','2019-10-17 04:27:27.633486',21),(80,'none of the mentioned',0,'','2019-10-17 04:27:27.642481','2019-10-17 04:27:27.642481',21),(81,'True',1,NULL,'2019-10-17 04:28:00.357159','2019-10-17 04:28:00.357159',22),(82,'False',0,NULL,'2019-10-17 04:28:00.366154','2019-10-17 04:28:00.366154',22),(83,'abc = 1,000,000',0,'','2019-10-17 04:28:59.927093','2019-10-17 04:28:59.927093',23),(84,'a b c = 1000 2000 3000',1,'','2019-10-17 04:28:59.932092','2019-10-17 04:28:59.932092',23),(85,'a,b,c = 1000, 2000, 3000',0,'','2019-10-17 04:28:59.936090','2019-10-17 04:28:59.936090',23),(86,'a_b_c = 1,000,000',0,'','2019-10-17 04:28:59.940087','2019-10-17 04:28:59.940087',23),(87,'CREATE',1,'','2019-10-17 04:30:46.321998','2019-10-17 04:30:46.321998',24),(88,'REPLACE',1,'','2019-10-17 04:30:46.327993','2019-10-17 04:30:46.327993',24),(89,'To hear voice samples',1,'','2019-10-17 04:42:33.398389','2019-10-17 04:42:33.398389',25),(90,'To add a new phone number',0,'','2019-10-17 04:42:33.402385','2019-10-17 04:42:33.402385',25),(91,'To submit a credit card payment',0,'','2019-10-17 04:42:33.406384','2019-10-17 04:42:33.406384',25),(92,'To request recording equipment',0,'','2019-10-17 04:42:33.410381','2019-10-17 04:42:33.410381',25),(93,'It fills orders once a week.',0,'','2019-10-17 04:43:03.629580','2019-10-17 04:43:03.629580',26),(94,'It advertises in the newspaper',1,'','2019-10-17 04:43:03.637576','2019-10-17 04:43:03.637576',26),(95,'It specializes in data-processing services.',0,'','2019-10-17 04:43:03.641573','2019-10-17 04:43:03.641573',26),(96,'It has recently expanded its business.',0,'','2019-10-17 04:43:03.645570','2019-10-17 04:43:03.645570',26),(97,'An actor',0,'','2019-10-17 04:43:32.263247','2019-10-17 04:43:32.263247',27),(98,'A script writer',0,'','2019-10-17 04:43:32.266245','2019-10-17 04:43:32.266245',27),(99,'A sales associate',0,'','2019-10-17 04:43:32.275239','2019-10-17 04:43:32.275239',27),(100,'A business owner',1,'','2019-10-17 04:43:32.279237','2019-10-17 04:43:32.279237',27),(101,'Professional voice talent',0,'','2019-10-17 04:44:17.660659','2019-10-17 04:44:17.661658',28),(102,'On-hold messages',1,'','2019-10-17 04:44:17.664656','2019-10-17 04:44:17.664656',28),(103,'Customized script writing',0,'','2019-10-17 04:44:17.668653','2019-10-17 04:44:17.668653',28),(104,'Multilingual voice production',0,'','2019-10-17 04:44:17.672651','2019-10-17 04:44:17.672651',28),(105,'Meet with an actor',0,'','2019-10-17 04:44:44.433197','2019-10-17 04:44:44.433197',29),(106,'Visit a recording studio',0,'','2019-10-17 04:44:44.436194','2019-10-17 04:44:44.437192',29),(107,'Write a script',0,'','2019-10-17 04:44:44.440191','2019-10-17 04:44:44.440191',29),(108,'Speak with a representative',1,'','2019-10-17 04:44:44.444188','2019-10-17 04:44:44.444188',29);
/*!40000 ALTER TABLE `exam_exam_choice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_exam_question`
--

DROP TABLE IF EXISTS `exam_exam_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_exam_question` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `question` longtext,
  `question_type` varchar(100) NOT NULL,
  `created_on` datetime(6) NOT NULL,
  `update_on` datetime(6) NOT NULL,
  `exam_id` int(11) NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `exam_exam_question_exam_id_d4ee1a14_fk_exam_exam_exam_id` (`exam_id`),
  CONSTRAINT `exam_exam_question_exam_id_d4ee1a14_fk_exam_exam_exam_id` FOREIGN KEY (`exam_id`) REFERENCES `exam_exam` (`exam_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_exam_question`
--

LOCK TABLES `exam_exam_question` WRITE;
/*!40000 ALTER TABLE `exam_exam_question` DISABLE KEYS */;
INSERT INTO `exam_exam_question` VALUES (3,'Customer reviews indicate that many modern mobile devices are often unnecessarily…………………..','Multiple Choice - One answer','2019-10-17 04:03:59.777155','2019-10-17 04:03:59.777155',3),(4,'Jamal Nawzad has received top performance reviews …………. he joined the sales department two years ago.','Multiple Choice - One answer','2019-10-17 04:04:44.046836','2019-10-17 04:04:44.046836',3),(5,'Gyeon Corporation’s continuing education policy states that …........ learning new skills enhances creativity and focus.','Multiple Choice - One answer','2019-10-17 04:05:18.759661','2019-10-17 04:05:18.759661',3),(6,'Among …..… recognized at the company awards ceremony were senior business analyst Natalie Obi and sales associate Peter Comeau.','Multiple Choice - One answer','2019-10-17 04:06:24.818526','2019-10-17 04:06:24.818526',3),(7,'All clothing sold in Develyn’s Boutique is made from natural materials and contains no …………. dyes.','Multiple Choice - One answer','2019-10-17 04:07:04.922991','2019-10-17 04:07:04.922991',3),(8,'He is excited about the new promotion and looking forward to …………………. more responsibilities.','Multiple Choice - One answer','2019-10-17 04:07:36.930223','2019-10-17 04:07:36.930223',3),(9,'All the orders got ……………….. on schedule.','Multiple Choice - One answer','2019-10-17 04:08:14.834647','2019-10-17 04:08:14.834647',3),(10,'The report showed that overall prices are up 3.1 percent …………………. 12 months.','Multiple Choice - One answer','2019-10-17 04:08:53.863401','2019-10-17 04:08:53.863401',3),(11,'Property taxes ……………….. about 40 percent of the overall tax revenue the state collects.','Multiple Choice - One answer','2019-10-17 04:09:26.000945','2019-10-17 04:09:26.000945',3),(12,'Strong exports …………….. in driving first-quarter growth, rising 35 percent from a year earlier.','Multiple Choice - One answer','2019-10-17 04:10:09.727958','2019-10-17 04:10:09.727958',3),(16,'During program development, software requirements specify','Multiple Choice - One answer','2019-10-17 04:20:26.813961','2019-10-17 04:20:26.813961',4),(17,'Which statements about IO are correct (2 answers)?','Multiple Choice - Multiple answer','2019-10-17 04:21:15.314963','2019-10-17 04:21:15.314963',4),(18,'What is the top .NET class that everything is derived from?','Multiple Choice - One answer','2019-10-17 04:21:57.485522','2019-10-17 04:21:57.485522',4),(19,'What is the correct HTML for creating a hyperlink?','Multiple Choice - One answer','2019-10-17 04:22:34.995779','2019-10-17 04:22:34.995779',4),(20,'A new Database is created by ?','Multiple Choice - One answer','2019-10-17 04:23:15.255660','2019-10-17 04:23:15.255660',4),(21,'What is the output of the following?','Multiple Choice - One answer','2019-10-17 04:27:27.621494','2019-10-17 04:27:27.621494',5),(22,'The expression Int(x) implies that the variable x is converted to integer. State whether true or false.','True False','2019-10-17 04:28:00.343167','2019-10-17 04:28:00.343167',5),(23,'Which of the following is an invalid statement?','Multiple Choice - One answer','2019-10-17 04:28:58.918197','2019-10-17 04:28:58.918197',5),(24,'Enter the missing keyword to make a new stored procedure.\n____________ PROCEDURE foo\n( p_foo_text  IN VARCHAR2 ) AS\nBEGIN\nNULL;\nEND;','Free Text','2019-10-17 04:30:46.314002','2019-10-17 04:30:46.314002',4),(25,'According to the advertisement, why should customers visit the Business Audio Pro Web site?','Multiple Choice - One answer','2019-10-17 04:42:33.389395','2019-10-17 04:42:33.389395',10),(26,'What is suggested about Business Audio Pro?','Multiple Choice - One answer','2019-10-17 04:43:03.622585','2019-10-17 04:43:03.622585',10),(27,'Who most likely is Ms. Annesly?','Multiple Choice - One answer','2019-10-17 04:43:32.256252','2019-10-17 04:43:32.256252',10),(28,'What service does Ms. Annesly NOT request from Business Audio Pro?','Multiple Choice - One answer','2019-10-17 04:44:17.654664','2019-10-17 04:44:17.654664',10),(29,'What will Ms. Annesly most likely do within 24 hours?','Multiple Choice - One answer','2019-10-17 04:44:44.423203','2019-10-17 04:44:44.423203',10);
/*!40000 ALTER TABLE `exam_exam_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_image`
--

DROP TABLE IF EXISTS `exam_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(100) DEFAULT NULL,
  `question_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `exam_image_question_id_38643ba2_fk_exam_exam` (`question_id`),
  CONSTRAINT `exam_image_question_id_38643ba2_fk_exam_exam` FOREIGN KEY (`question_id`) REFERENCES `exam_exam_question` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_image`
--

LOCK TABLES `exam_image` WRITE;
/*!40000 ALTER TABLE `exam_image` DISABLE KEYS */;
INSERT INTO `exam_image` VALUES (3,'image/question/Capture.PNG',21),(4,'image/question/Capture_b8BFld6.PNG',25),(5,'image/question/Capture1.PNG',25);
/*!40000 ALTER TABLE `exam_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_subject`
--

DROP TABLE IF EXISTS `exam_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_subject` (
  `subject_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `created_on` datetime(6) NOT NULL,
  `update_on` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`subject_id`),
  KEY `exam_subject_user_id_e30c170a_fk_auth_user_id` (`user_id`),
  CONSTRAINT `exam_subject_user_id_e30c170a_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_subject`
--

LOCK TABLES `exam_subject` WRITE;
/*!40000 ALTER TABLE `exam_subject` DISABLE KEYS */;
INSERT INTO `exam_subject` VALUES (1,'English','2019-10-17 02:03:58.131403','2019-10-17 02:03:58.131403',1),(2,'Programing','2019-10-17 02:26:05.533672','2019-10-17 02:26:05.533672',1),(3,'System','2019-10-17 02:27:07.643491','2019-10-17 02:27:07.643491',1);
/*!40000 ALTER TABLE `exam_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_topic`
--

DROP TABLE IF EXISTS `exam_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_topic` (
  `topic_id` int(11) NOT NULL AUTO_INCREMENT,
  `topic` varchar(255) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `total_exam` int(11) NOT NULL,
  PRIMARY KEY (`topic_id`),
  KEY `exam_topic_subject_id_9bbb0a1b_fk_exam_subject_subject_id` (`subject_id`),
  CONSTRAINT `exam_topic_subject_id_9bbb0a1b_fk_exam_subject_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `exam_subject` (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_topic`
--

LOCK TABLES `exam_topic` WRITE;
/*!40000 ALTER TABLE `exam_topic` DISABLE KEYS */;
INSERT INTO `exam_topic` VALUES (1,'All',1,2),(4,'Python',2,1),(5,'Programming',3,1);
/*!40000 ALTER TABLE `exam_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_user_attempt`
--

DROP TABLE IF EXISTS `exam_user_attempt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_user_attempt` (
  `attempt_id` int(11) NOT NULL AUTO_INCREMENT,
  `total_attempted` int(11) NOT NULL,
  `total_correct` int(11) NOT NULL,
  `created_on` datetime(6) NOT NULL,
  `update_on` datetime(6) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`attempt_id`),
  KEY `exam_user_attempt_exam_id_d1b81e80_fk_exam_exam_exam_id` (`exam_id`),
  KEY `exam_user_attempt_user_id_8cc54dd0_fk_auth_user_id` (`user_id`),
  CONSTRAINT `exam_user_attempt_exam_id_d1b81e80_fk_exam_exam_exam_id` FOREIGN KEY (`exam_id`) REFERENCES `exam_exam` (`exam_id`),
  CONSTRAINT `exam_user_attempt_user_id_8cc54dd0_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_user_attempt`
--

LOCK TABLES `exam_user_attempt` WRITE;
/*!40000 ALTER TABLE `exam_user_attempt` DISABLE KEYS */;
INSERT INTO `exam_user_attempt` VALUES (2,10,6,'2019-10-17 04:49:10.069617','2019-10-17 04:49:10.069617',3,5);
/*!40000 ALTER TABLE `exam_user_attempt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_user_attempt_detail`
--

DROP TABLE IF EXISTS `exam_user_attempt_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_user_attempt_detail` (
  `attempt_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `question_text` longtext NOT NULL,
  `choose_answer` longtext NOT NULL,
  `correct_answer` longtext NOT NULL,
  `created_on` datetime(6) NOT NULL,
  `update_on` datetime(6) NOT NULL,
  `attempt_id` int(11) NOT NULL,
  `q_id` int(11) NOT NULL,
  PRIMARY KEY (`attempt_detail_id`),
  KEY `exam_user_attempt_de_attempt_id_2b880ec7_fk_exam_user` (`attempt_id`),
  KEY `exam_user_attempt_de_q_id_9c525b2b_fk_exam_exam` (`q_id`),
  CONSTRAINT `exam_user_attempt_de_attempt_id_2b880ec7_fk_exam_user` FOREIGN KEY (`attempt_id`) REFERENCES `exam_user_attempt` (`attempt_id`),
  CONSTRAINT `exam_user_attempt_de_q_id_9c525b2b_fk_exam_exam` FOREIGN KEY (`q_id`) REFERENCES `exam_exam_question` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_user_attempt_detail`
--

LOCK TABLES `exam_user_attempt_detail` WRITE;
/*!40000 ALTER TABLE `exam_user_attempt_detail` DISABLE KEYS */;
INSERT INTO `exam_user_attempt_detail` VALUES (2,'Customer reviews indicate that many modern mobile devices are often unnecessarily…………………..','complication','complicated','2019-10-17 04:49:10.075614','2019-10-17 04:49:10.075614',2,3),(3,'Jamal Nawzad has received top performance reviews …………. he joined the sales department two years ago.','since','since','2019-10-17 04:49:10.081611','2019-10-17 04:49:10.081611',2,4),(4,'Gyeon Corporation’s continuing education policy states that …........ learning new skills enhances creativity and focus.','regularly','regularly','2019-10-17 04:49:10.085609','2019-10-17 04:49:10.086607',2,5),(5,'Among …..… recognized at the company awards ceremony were senior business analyst Natalie Obi and sales associate Peter Comeau.','who','those','2019-10-17 04:49:10.095602','2019-10-17 04:49:10.095602',2,6),(6,'All clothing sold in Develyn’s Boutique is made from natural materials and contains no …………. dyes.','synthetic','synthetic','2019-10-17 04:49:10.099599','2019-10-17 04:49:10.099599',2,7),(7,'He is excited about the new promotion and looking forward to …………………. more responsibilities.','taking on','taking on','2019-10-17 04:49:10.103597','2019-10-17 04:49:10.103597',2,8),(8,'All the orders got ……………….. on schedule.','delivered','delivered','2019-10-17 04:49:10.107594','2019-10-17 04:49:10.107594',2,9),(9,'The report showed that overall prices are up 3.1 percent …………………. 12 months.','periodically over','during the last','2019-10-17 04:49:10.110592','2019-10-17 04:49:10.110592',2,10),(10,'Property taxes ……………….. about 40 percent of the overall tax revenue the state collects.','are raised by','account for','2019-10-17 04:49:10.114590','2019-10-17 04:49:10.114590',2,11),(11,'Strong exports …………….. in driving first-quarter growth, rising 35 percent from a year earlier.','played a big role','played a big role','2019-10-17 04:49:10.118587','2019-10-17 04:49:10.118587',2,12);
/*!40000 ALTER TABLE `exam_user_attempt_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialaccount`
--

DROP TABLE IF EXISTS `socialaccount_socialaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) NOT NULL,
  `uid` varchar(191) NOT NULL,
  `last_login` datetime(6) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `extra_data` longtext NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialaccount_provider_uid_fc810c6e_uniq` (`provider`,`uid`),
  KEY `socialaccount_socialaccount_user_id_8146e70c_fk_auth_user_id` (`user_id`),
  CONSTRAINT `socialaccount_socialaccount_user_id_8146e70c_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialaccount`
--

LOCK TABLES `socialaccount_socialaccount` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp`
--

DROP TABLE IF EXISTS `socialaccount_socialapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialapp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) NOT NULL,
  `name` varchar(40) NOT NULL,
  `client_id` varchar(191) NOT NULL,
  `secret` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp`
--

LOCK TABLES `socialaccount_socialapp` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp_sites`
--

DROP TABLE IF EXISTS `socialaccount_socialapp_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialapp_sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `socialapp_id` int(11) NOT NULL,
  `site_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialapp_sites_socialapp_id_site_id_71a9a768_uniq` (`socialapp_id`,`site_id`),
  KEY `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` (`site_id`),
  CONSTRAINT `socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc` FOREIGN KEY (`socialapp_id`) REFERENCES `socialaccount_socialapp` (`id`),
  CONSTRAINT `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` FOREIGN KEY (`site_id`) REFERENCES `django_site` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp_sites`
--

LOCK TABLES `socialaccount_socialapp_sites` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialtoken`
--

DROP TABLE IF EXISTS `socialaccount_socialtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialtoken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `token_secret` longtext NOT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `account_id` int(11) NOT NULL,
  `app_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq` (`app_id`,`account_id`),
  KEY `socialaccount_social_account_id_951f210e_fk_socialacc` (`account_id`),
  CONSTRAINT `socialaccount_social_account_id_951f210e_fk_socialacc` FOREIGN KEY (`account_id`) REFERENCES `socialaccount_socialaccount` (`id`),
  CONSTRAINT `socialaccount_social_app_id_636a42d7_fk_socialacc` FOREIGN KEY (`app_id`) REFERENCES `socialaccount_socialapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialtoken`
--

LOCK TABLES `socialaccount_socialtoken` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialtoken` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-17 12:37:03
