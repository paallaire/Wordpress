# Podiatrix



## **Installation**

```
Npm install
```



###  Commande (laravel mix - Webpack)

**watch**

```
npm run watch
```

**Build (Dev)**

```
npm run dev
```

**Build (Prod)**

```
npm run production
```

 

## [laravel-mix](https://github.com/JeffreyWay/laravel-mix)

Permet d’utiliser la force de webpack sans ce compliquéla vie.

<https://github.com/JeffreyWay/laravel-mix>

 

**Documentation**

<https://github.com/JeffreyWay/laravel-mix/tree/master/docs#readme>



## Wordpress + Timber

Timber va apporter une petite surcouche **vous permettant d’utiliser du templating et bien séparer le code PHP de vos pages, du HTML**.



**Documentation**

https://timber.github.io/docs/

**Guides**

https://timber.github.io/docs/guides/



## [Polylang](https://polylang.pro/)

Est le plugin utilisé pour permette d'avoir un site multilingue.



**Clé de traductions**

Il est existe des traductions dans le code.



Exemple :

```
{{ "Telephone:" | t }}
```



Il est possible de traduire ( francais et/ou anglais ) les clés dans l'admin de wordpress à l'adresse suivantes  : 

```
/wp-admin/admin.php?page=mlang_strings
```



**Pour ajouter/enlever une clé de traduires**

Il faut l'ajouter dans le fichier PHP suivant :

```
\themes\podiatrix\lib\lang.php

Exemple :
pll_register_string( "Key", "default value" );
```

