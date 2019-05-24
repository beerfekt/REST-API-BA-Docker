<?php

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.
// Returns the private 'doctrine.fixtures_load_command' shared service.

$a = new \Doctrine\Bundle\FixturesBundle\Loader\SymfonyFixturesLoader($this);
$a->addFixtures(array(0 => array('fixture' => new \App\DataFixtures\AppFixtures(($this->services['security.password_encoder'] ?? $this->load('getSecurity_PasswordEncoderService.php'))), 'groups' => array())));

$this->privates['doctrine.fixtures_load_command'] = $instance = new \Doctrine\Bundle\FixturesBundle\Command\LoadDataFixturesDoctrineCommand($a);

$instance->setName('doctrine:fixtures:load');

return $instance;
