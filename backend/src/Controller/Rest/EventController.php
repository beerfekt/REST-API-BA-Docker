<?php

namespace App\Controller\Rest;

use App\Services\EventService;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use function MongoDB\BSON\toJSON;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Event;
use FOS\RestBundle\View\View;
use App\DTO\Event\EventDTO;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Entity\User;

class EventController extends FOSRestController {


    /**
     * @var EventService
     */
    private $eventService;

    /**
     * EventController constructor.
     * @param EventService $eventService
     */
    public function __construct(EventService $eventService)
    {
        //TODO: DOKU CORS
        //CORS - ALLOW ACCESS
        //header('Access-Control-Allow-Origin: *');
        //header('Access-Control-Allow-Methods: POST, DELETE, PUT, GET');
        //Muss via PLUGIN gemacht werden

        $this->eventService = $eventService;
    }



    //Test via Browser-URL:
    // http://rest-tutorial.test/api/events/event/3

    /**
     * Retrieves an Event resource
     * @Rest\Get("/events/list/{eventID}")
     * @param int $eventId
     * @return View
     * @throws \Doctrine\ORM\EntityNotFoundException
     */
    public function getEvent(int $eventID): View
    {
        $event = $this->eventService->get($eventID);
        return View::create($event, Response::HTTP_OK);
    }


    //Test via Browser-URL:
    // http://rest-backend.test/api/events/list

        /**
         * Retrieves a collection of Event resource
         * @Rest\Get("/events/list")
         * @return view
         */
        public function getEvens(): View
        {
            $events = $this->eventService->getAll();
            return View::create($events, Response::HTTP_OK);
        }


    // Test via terminal:
    // curl -i -X POST -H 'Content-Type: application/json' -d '{"title": "new T", "content": "new C"}' http://rest-tutorial.test/api/events
    // FALSCH: curl -i -X POST -H 'Content-Type: application/json' -d '{title: "new T", content: "new C"}' http://rest-tutorial.test/api/events
//TODO: test /admin/events bei post -> NUR TEMPORÄR - wieder löschen bei fail
    /**
     * Creates new event resource in database
     * @Rest\Post("/admin/events")
     * @ParamConverter("eventDTO", converter="fos_rest.request_body")
     * @param EventDTO $eventDTO
     * @return view
     */
    public function addEvent (EventDTO $eventDTO): View
    {
        $event = $this->eventService->create($eventDTO);
        $this->eventService->persist($event);
        return View::create($event, Response::HTTP_CREATED);
    }

    //Test via terminal:
    // curl -i -X PUT -H 'Content-Type: application/json' -d '{"title": "Updated Title", "content": "updated Content"}' http://rest-tutorial.test/api/events/4

    /**
     * updates a events resource
     * @Rest\Put("/events/{eventsID}")
     * @ParamConverter("eventDTO", converter="fos_rest.request_body")
     * @param EventDTO $eventDTO
     * @throws \Doctrine\ORM\EntityNotFoundException
     * @return view
     */
    public function updateEvent(EventDTO $eventDTO, int $eventID): View
    {
        $event = $this->eventService->update($eventDTO,$eventID);
        $this->eventService->persist($event);
        return View::create($event, Response::HTTP_OK);
    }


    //Test Delete -> Terminal:
    // curl -i -X DELETE http://rest-tutorial.test/api/events/3

    /**
     * updates a event resource
     * @Rest\Delete("/events/{eventID}")
     * @throws \Doctrine\ORM\EntityNotFoundException
     * @return view
     */
    public function deleteEvent(int $eventID): View
    {
        $event = $this->eventService->get($eventID);
        $this->eventService->remove($event);
        return View::create($event, Response::HTTP_NO_CONTENT);
    }



    /**
     * empty implementation for the OPTIONS STUFF
     * @Rest\Options("/events")
     */
    public function options(){}



    //TODO: Exception Handling  https://www.thinktocode.com/2018/03/26/symfony-4-rest-api-part-1-fosrestbundle/

}
