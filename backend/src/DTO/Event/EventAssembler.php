<?php
/**
 * convert from your DTO to your Entity, and from your Entity to your DTO
 *  filling out the missing fields, if any
 */

namespace App\DTO\Event;

use App\Entity\Event;
use Symfony\Component\Validator\Constraints\DateTime;


final class EventAssembler
{


    public function readDTO(EventDTO $eventDTO, ?Event $event = null): Event
    {
        if (!$event) {
            $event = new Event();
        }

        $event->setTitle($eventDTO->getTitle());
        $event->setDescription($eventDTO->getDescription());
        //TODO: aufräumen falls funktioniert
        //$convertedDate = $this->convertSecondsToDate( $eventDTO->getStartDate() );
        $event->setStartDate($this->convertSecondsToDate( $eventDTO->getStartDate() ));
        $event->setEndDate($this->convertSecondsToDate( $eventDTO->getEndDate() ));
        return $event;
    }


    public function updateEvent(Event $event, EventDTO $eventDTO): Event
    {
        return $this->readDTO($eventDTO, $event);
    }


    public function createEvent(EventDTO $eventDTO): Event
    {
        return $this->readDTO($eventDTO);
    }


    public function writeDTO(Event $event)
    {
        return new EventDTO(
            $event->getTitle(),
            $event->getDescription(),
            $event->getStartDate(),
            $event->getEndDate()
        );
    }

    private function convertSecondsToDate(string $date) : \DateTime
    {
        $dateAsInt = intval($date);
        $dateTime = new \DateTime();
        $dateTime->setTimestamp($dateAsInt);
        echo $dateTime->format('U = Y-m-d H:i:s') . "n";
        return $dateTime;
    }

}