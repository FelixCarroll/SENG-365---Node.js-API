
--
-- Table structure for table `creators`
--

DROP TABLE IF EXISTS `creators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `creators` (
  `projectID` int(11) unsigned NOT NULL,
  `userID` int(11) unsigned NOT NULL,
  PRIMARY KEY (`projectID`,`userID`),
  KEY `fk_user` (`userID`),
  KEY `fk_pro` (`projectID`) USING BTREE,
  CONSTRAINT `fk_pro` FOREIGN KEY (`projectID`) REFERENCES `projects` (`projectID`),
  CONSTRAINT `fk_user` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creators`
--

LOCK TABLES `creators` WRITE;
/*!40000 ALTER TABLE `creators` DISABLE KEYS */;
INSERT INTO `creators` VALUES (10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(23,1),(24,1),(25,1),(26,1),(27,1),(28,1),(29,1),(30,1),(32,1),(33,1),(34,1),(35,1),(36,1),(37,1),(16,8),(17,8),(18,8),(19,8),(20,8),(31,8),(32,8),(33,8),(34,8),(35,8),(36,8),(37,8),(28,14),(29,14),(30,14),(32,23),(33,23),(35,23),(36,23),(37,23);
/*!40000 ALTER TABLE `creators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pledges`
--

DROP TABLE IF EXISTS `pledges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pledges` (
  `pledgeID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `projectID` int(10) unsigned NOT NULL,
  `userID` int(10) unsigned NOT NULL,
  `amount` int(10) unsigned NOT NULL,
  `anon` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pledgeID`,`projectID`,`userID`),
  KEY `fk_puser` (`userID`),
  KEY `fk_ppro` (`projectID`),
  CONSTRAINT `fk_ppro` FOREIGN KEY (`projectID`) REFERENCES `projects` (`projectID`),
  CONSTRAINT `fk_puser` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pledges`
--

LOCK TABLES `pledges` WRITE;
/*!40000 ALTER TABLE `pledges` DISABLE KEYS */;
INSERT INTO `pledges` VALUES (1,10,1,10,0),(2,10,1,10,1),(3,10,1,10,1),(4,10,1,10,1),(5,10,1,10,1),(6,10,1,10,1),(7,10,1,10,1),(8,10,8,10,1),(9,10,8,10,0);
/*!40000 ALTER TABLE `pledges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `projectID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `subtitle` varchar(150) DEFAULT NULL,
  `desciption` text NOT NULL,
  `imageURI` text NOT NULL,
  `target` int(11) NOT NULL,
  `total` int(11) NOT NULL DEFAULT '0',
  `backers` int(11) NOT NULL DEFAULT '0',
  `creationDate` date DEFAULT NULL,
  `open` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`projectID`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'School Trip','to auckalnd','need money','/image/123',1000,0,0,NULL,1),(2,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,0),(3,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(4,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(5,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(6,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(7,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(8,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(10,'HELP','Plummer','Need plummer','./Images/10',500,0,0,NULL,0),(11,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(12,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(13,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(14,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(15,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(16,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(17,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(18,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(19,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(20,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(21,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(22,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(23,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(24,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(25,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(26,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(27,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(28,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(29,'HELP','Plummer','Need plummer','/image/123',500,0,0,NULL,1),(30,'HELP','Plummer','Need plummer','/image/123',500,0,0,'2017-08-18',1),(31,'new','test','idk','NA',100,0,0,'2017-08-19',1),(32,'new','test','idk','NA',100,0,0,'2017-08-19',1),(33,'new','test','idk','NA',100,0,0,'2017-08-19',1),(34,'new','test','idk','NA',100,0,0,'2017-08-19',1),(35,'new','test','idk','NA',100,0,0,'2017-08-19',1),(36,'new','test','idk','/36/Image',100,0,0,'2017-08-19',1),(37,'new','test','idk','projects/37/Image',100,0,0,'2017-08-19',1);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rewards`
--

DROP TABLE IF EXISTS `rewards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rewards` (
  `projectID` int(11) unsigned NOT NULL,
  `rewardID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `amount` int(10) unsigned NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  PRIMARY KEY (`rewardID`,`projectID`) USING BTREE,
  KEY `fk_pro` (`projectID`),
  CONSTRAINT `fk_rpro` FOREIGN KEY (`projectID`) REFERENCES `projects` (`projectID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rewards`
--

LOCK TABLES `rewards` WRITE;
/*!40000 ALTER TABLE `rewards` DISABLE KEYS */;
INSERT INTO `rewards` VALUES (19,1,2000,'swaggin'),(20,2,2000,'swaggin'),(21,3,2000,'swaggin'),(22,4,2000,'swaggin'),(23,5,2000,'swaggin'),(24,6,2000,'swaggin'),(25,7,2000,'swaggin'),(27,8,2000,'swaggin'),(30,10,2000,'swaggin'),(10,12,23432423,'swaggin'),(10,13,10,'fidget spnner');
/*!40000 ALTER TABLE `rewards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens` (
  `userID` int(10) unsigned NOT NULL,
  `tokenID` varchar(42) NOT NULL,
  PRIMARY KEY (`userID`) USING BTREE,
  UNIQUE KEY `uniqie` (`tokenID`),
  CONSTRAINT `fk_tuser` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (23,'*14119821E4F539B4F458A5FAAF51FF0B28BF4483'),(1,'*170D0E4D8B5A2D53EE73945448633E24097B2E85'),(8,'*1C806B039D5839610F549B645C98AB8067404D29'),(14,'*62EC1AEAEBF31459D87A0DBCD8F7EF6B05C4EE17');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(12) NOT NULL,
  `email` varchar(255) NOT NULL,
  `location` varchar(16) NOT NULL,
  `pass` varchar(40) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test','test@test.com','chicken','pass'),(6,'felix','felix@test.com','nz','pass'),(8,'Stacey','stacey89@work.com','USA','pass123'),(10,'hello','hello@tam.com','UK','123'),(14,'John123','123@SMITH.com','UK','123'),(23,'pete','pete@p.com','france','p');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-08-19 17:50:14
