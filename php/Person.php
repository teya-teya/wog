<?php
class Person
{
  private $name;
  private $lastname;
  private $age;
  private $hp;
  private $mother;
  private $father;

  function __construct($name, $lastname, $age, $mother=null, $father=null)
  {
    $this->name = $name;
    $this->lastname = $lastname;
    $this->age = $age;
    $this->mother = $mother;
    $this->father = $father;
    $this->hp = 100;
  }
  function setHp($hp)
  {
    if ($this->hp + $hp >= 100) $this->hp = 100;
    else $this->hp = $this->hp + $hp;
  }
  function getHp() {
    return $this->hp;
  }
  function getName() {
    return $this->name;
  }
  function getLastname() {
    return $this->lastname;
  }
  function sayHi($name)
  {
    return "Hi, $name, I`m " . $this->name;
  }
  function getMother() {
    return $this->mother;
  }
  function getFather() {
    return $this->father;
  }

  // function getInfo() {
  //   return "<h2>A few words about meself:</h2><br>" . "My name is " . $this->getName() . 
  //   ". My lastname is " . $this->getLastname() . 
  //   "<br>My mother's name is " . $this->getMother()->getName() . 
  //   ", her lastname is " . $this->getMother()->getLastname() . 
  //   "<br>My father's name is " . $this->getFather()->getName() . 
  //   ", his lastname is " . $this->getFather()->getLastname() . 
  //   ". <br>My maternal grandmother`s name is " . $this->getMother()->getMother()->getName() . 
  //   ", her lastname is " . $this->getMother()->getMother()->getLastname() . 
  //   ". <br>My maternal grandfather`s name is " . $this->getMother()->getFather()->getName() . 
  //   ", his lastname is " . $this->getMother()->getFather()->getLastname() . 
  //   ". <br>My paternal grandmother`s name is " . $this->getFather()->getMother()->getName() . 
  //   ", her lastname is " . $this->getFather()->getMother()->getLastname() . 
  //   ". <br>My paternal grandfather`s name is " . $this->getFather()->getFather()->getName() . 
  //   ", his lastname is " . $this->getFather()->getFather()->getLastname();
  // }


function getInfo() {
  return "<h2>A few words about meself:</h2><br>" . "My name is " . $this->getName() . 
  ". My lastname is " . $this->getLastname() . 
  ". <br>My mother's name is " . $this->getMother()->getName() . 
  ", her lastname is " . $this->getMother()->getLastname() . 
  ". <br>My father's name is " . $this->getFather()->getName() . 
  ", his lastname is " . $this->getFather()->getLastname() . 
  ". <br>I have maternal grandparents, their first and last names are " . $this->getMother()->getMother()->getName() . " " . $this->getMother()->getMother()->getLastname() . 
  " and " . $this->getMother()->getFather()->getName() . " " . $this->getMother()->getFather()->getLastname() . 
  ". <br>I have paternal grandparents, their first and last names are " . $this->getFather()->getMother()->getName() . " " . $this->getFather()->getMother()->getLastname() . 
  " and " . $this->getFather()->getFather()->getName() . " " . $this->getFather()->getFather()->getLastname() . ".";
}
}
$parfen = new Person("Parfen", "Benediktov", 68);
$modesta = new Person("Modesta", "Benediktova", 60);

$tadeush = new Person("Tadeush", "Vevelskiy", 67);
$angelina = new Person("Angelina", "Vevelskaya", 59);

$lihoslav = new Person("Lihoslav", "Vevelskiy", 42, $angelina, $tadeush);
$evdokia = new Person("Evdokia", "Vevelskaya", 42, $modesta, $parfen);
$agata = new Person("Agata", "Vevelskaya", 14, $evdokia, $lihoslav);


echo $agata->getInfo();

//echo $valera->getMother()->getFather()->getName();

//Здоровье 100 и не более

// $medKit = 50;
// $alex->setHp(-30); //Упал
// echo $alex->getHp() . "<br>";
// $alex->setHp($medKit); //Нашел аптечку
// echo $alex->getHp() . "<br>";


//echo $alex->sayHi($igor->name);
// $alex->name = "Alex";
//echo $alex->name;