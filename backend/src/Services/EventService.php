<?php

namespace App\Services;


use App\Entity\Event;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityNotFoundException;   //Exceptionhandling #1
use Symfony\Component\HttpFoundation\Request;
use App\Repository\EventRepository;
use App\DTO\Event\EventDTO;
use App\DTO\Event\EventAssembler;

final class EventService
{

    /**
     * @var ObjectManager
     */
    private $entityManager;


    /**
     * @var ObjectRepository
     */
    private $eventRepository;

    /**
     * @var EventAssembler
     */
    private $eventAssembler;


    /**
     * EventService constructor.
     * @param ObjectManager $entityManager
     * @param EventRepository $eventRepository
     */
    public function __construct(
        ObjectManager $entityManager,
        EventRepository $eventRepository,
        EventAssembler $eventAssembler
    )
    {
        $this->entityManager = $entityManager;
        $this->eventRepository  = $eventRepository ;
        $this->eventAssembler = $eventAssembler;
    }



    /**
     * Creates an Event resource
     * @param Event $event
     */
    public function persist(Event $event)
    {
        $this->entityManager->persist($event);
        // actually executes the queries (i.e. the INSERT query)
        $this->entityManager->flush();
    }

    //Exceptionhandling #2
    /**
     * @param int $eventID
     * @return Event
     * @throws EntityNotFoundException
     */
    public function get(int $eventID) :Event
    {
        $event = $this->eventRepository->find($eventID);
        //Exception Handling #3
        //                       - let the code fail fast!
        if (!$event) {
            throw new EntityNotFoundException('Event with id '.$eventID.' does not exist!');
        }
        return $event;
    }

    /**
     * @return object[]
     */
    public function getAll()
    {
        return $this->eventRepository->findAll();
    }


    /**
     * @param EventDTO $eventDTO
     * @return Event
     */
    public function create(EventDTO $eventDTO):Event
    {
        $event = $this->eventAssembler->createEvent($eventDTO);
        return $event;
    }


    /**
     * @param EventDTO $eventDTO
     * @param int $eventID
     * @return Event
     */
    public function update(EventDTO $eventDTO, int $eventID):Event
    {
        //fetch "Article-Entity-Object" from db:
        $event = $this->get($eventID);
        if ($event) {

            //Fill it with Data from Data-Transfer-Object
            $event = $this->eventAssembler->updateEvent($event,$eventDTO);
        }
        return $event;
    }


    /**
     * Removes an Event
     * @param Event $event
     */
    public function remove(Event $event)
    {
        // tell Doctrine you want to delete the event
        $this->entityManager->remove($event);
        // actually executes the delete query
        $this->entityManager->flush();
    }




}