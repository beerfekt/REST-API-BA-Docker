<?php

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.
// Returns the public 'App\Controller\Rest\EventController' shared autowired service.

return $this->services['App\Controller\Rest\EventController'] = new \App\Controller\Rest\EventController(new \App\Services\EventService(($this->services['doctrine.orm.default_entity_manager'] ?? $this->load('getDoctrine_Orm_DefaultEntityManagerService.php')), ($this->privates['App\Repository\EventRepository'] ?? $this->load('getEventRepositoryService.php')), new \App\DTO\Event\EventAssembler()));
