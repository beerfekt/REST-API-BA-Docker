<?php
/**
 * Immutable Data Transfer object between application Layers
 */

namespace App\DTO\Event;


final class EventDTO
{
    private $title;
    private $description;
    private $startDate;
    private $endDate;

    public function __construct(string $title,
                                string $description,
                                int $startDate,
                                int $endDate)
    {
        $this->title = $title;
        $this->description = $description;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getStartDate(): int
    {
        return $this->startDate;
    }

    public function getEndDate(): int
    {
        return $this->endDate;
    }

    //TODO EVENT - RAUM [n:1]
    //TODO EVENT - USER [n:m]
    //TODO zu Gebäude kommt man über raum, daher kein attribut nötig?
    //TODO CreatedBy
    //TODO UpdatedBy


}