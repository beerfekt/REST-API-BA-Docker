<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;


/**
 * @ORM\Entity(repositoryClass="App\Repository\EventRepository")
 */
class Event
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $description;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $startDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $endDate;

    //TODO EVENT - RAUM [n:1]
    //TODO EVENT - USER [n:m]
    //TODO zu Gebäude kommt man über raum, daher kein attribut nötig?
    //TODO CreatedBy
    //TODO UpdatedBy

    /**
     * @return int
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param string $title
     * @throws \InvalidArgumentException
     * @return self
     */
    public function setTitle(string $title): self
    {
        if (\strlen($title) < 5) {
            throw new \InvalidArgumentException('Title needs to have more then 5 characters.');
        }
        $this->title = $title;

        return $this;
    }

    /**
     * @return string
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @param string $description
     * @throws \InvalidArgumentException
     * @return self
     */
    public function setDescription(string $description): self
    {
        if (\strlen($description) < 10) {
            throw new \InvalidArgumentException('Description needs to have more then 10 characters.');
        }
        $this->description = $description;
        return $this;
    }

    /**
     * @return \DateTimeInterface
     */
    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    /**
     * @return \DateTimeInterface
     */
    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    /**
     * @param \DateTimeInterface $startDate
     * @return self
     */
    public function setStartDate(\DateTimeInterface $startDate = null): self
    {
        $this->startDate = $startDate;
        return $this;
    }

    /**
     * @param \DateTimeInterface $enddate
     * @return self
     */
    public function setEndDate(\DateTimeInterface $endDate = null): self
    {
        $this->endDate = $endDate;
        return $this;
    }

}
