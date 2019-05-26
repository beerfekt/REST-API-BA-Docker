<?php

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.
// Returns the private 'debug.argument_resolver.service' shared service.

return $this->privates['debug.argument_resolver.service'] = new \Symfony\Component\HttpKernel\Controller\ArgumentResolver\TraceableValueResolver(new \Symfony\Component\HttpKernel\Controller\ArgumentResolver\ServiceValueResolver(new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($this->getService, array(
    'App\\Controller\\Rest\\EventController::addEvent' => array('privates', '.service_locator.tcrnKcu', 'get_ServiceLocator_TcrnKcuService.php', true),
    'App\\Controller\\Rest\\EventController::setViewHandler' => array('privates', '.service_locator.l2alLEu', 'get_ServiceLocator_L2alLEuService.php', true),
    'App\\Controller\\Rest\\EventController::updateEvent' => array('privates', '.service_locator.tcrnKcu', 'get_ServiceLocator_TcrnKcuService.php', true),
    'App\\Controller\\Rest\\UserController::addUser' => array('privates', '.service_locator.mcJyH0X', 'get_ServiceLocator_McJyH0XService.php', true),
    'App\\Controller\\Rest\\UserController::setViewHandler' => array('privates', '.service_locator.l2alLEu', 'get_ServiceLocator_L2alLEuService.php', true),
    'App\\Controller\\Rest\\UserController::updateUser' => array('privates', '.service_locator.mcJyH0X', 'get_ServiceLocator_McJyH0XService.php', true),
    'App\\Controller\\Rest\\EventController:addEvent' => array('privates', '.service_locator.tcrnKcu', 'get_ServiceLocator_TcrnKcuService.php', true),
    'App\\Controller\\Rest\\EventController:setViewHandler' => array('privates', '.service_locator.l2alLEu', 'get_ServiceLocator_L2alLEuService.php', true),
    'App\\Controller\\Rest\\EventController:updateEvent' => array('privates', '.service_locator.tcrnKcu', 'get_ServiceLocator_TcrnKcuService.php', true),
    'App\\Controller\\Rest\\UserController:addUser' => array('privates', '.service_locator.mcJyH0X', 'get_ServiceLocator_McJyH0XService.php', true),
    'App\\Controller\\Rest\\UserController:setViewHandler' => array('privates', '.service_locator.l2alLEu', 'get_ServiceLocator_L2alLEuService.php', true),
    'App\\Controller\\Rest\\UserController:updateUser' => array('privates', '.service_locator.mcJyH0X', 'get_ServiceLocator_McJyH0XService.php', true),
))), ($this->privates['debug.stopwatch'] ?? ($this->privates['debug.stopwatch'] = new \Symfony\Component\Stopwatch\Stopwatch(true))));