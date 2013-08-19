CREATE TABLE IF NOT EXISTS `users` (
`userId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`email` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
`password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
`name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
`nationality` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
`club` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
`ground` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
`stadium` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
`createdAt` datetime NOT NULL,
`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`userId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=22 ;

CREATE TABLE IF NOT EXISTS `leagues` (
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`leagueId` int unsigned NOT NULL,
`userId` bigint(20) unsigned NOT NULL,
`mp` int unsigned NOT NULL,
`w` int unsigned NOT NULL,
`d` int unsigned NOT NULL,
`l` int unsigned NOT NULL,
`gf` int unsigned NOT NULL,
`ga` int unsigned NOT NULL,
`gd` int unsigned NOT NULL,
`pt` int unsigned NOT NULL,
`createdAt` datetime NOT NULL,
`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=22 ;

CREATE TABLE IF NOT EXISTS `players` (
`userId` bigint(20) unsigned NOT NULL,
`playerId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
`nationality` varchar(4) NOT NULL,
`age` smallint(5) unsigned NOT NULL DEFAULT '18',
`pref_side` varchar(4) NOT NULL,
`sh` smallint(5) unsigned NOT NULL DEFAULT '1',
`st` smallint(5) unsigned NOT NULL DEFAULT '1',
`tk` smallint(5) unsigned NOT NULL DEFAULT '1',
`ps` smallint(5) unsigned NOT NULL DEFAULT '1',
`stamina` smallint(5) unsigned NOT NULL DEFAULT '54',
`ag` smallint(5) unsigned NOT NULL DEFAULT '36',
`sh_ab` smallint(5) unsigned NOT NULL DEFAULT '300',
`st_ab` smallint(5) unsigned NOT NULL DEFAULT '300',
`tk_ab` smallint(5) unsigned NOT NULL DEFAULT '300',
`ps_ab` smallint(5) unsigned NOT NULL DEFAULT '300',
`games` smallint(5) unsigned NOT NULL DEFAULT '0',
`saves` smallint(5) unsigned NOT NULL DEFAULT '0',
`tackles` smallint(5) unsigned NOT NULL DEFAULT '0',
`keypasses` smallint(5) unsigned NOT NULL DEFAULT '0',
`shots` smallint(5) unsigned NOT NULL DEFAULT '0',
`goals` smallint(5) unsigned NOT NULL DEFAULT '0',
`assists` smallint(5) unsigned NOT NULL DEFAULT '0',
`dp` smallint(5) unsigned NOT NULL DEFAULT '0',
`injury` smallint(5) unsigned NOT NULL DEFAULT '0',
`suspension` smallint(5) unsigned NOT NULL DEFAULT '0',
`fitness` smallint(5) unsigned NOT NULL DEFAULT '100',
`createdAt` datetime NOT NULL,
`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`playerId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=22 ;
