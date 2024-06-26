<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Web\User;
use Illuminate\Support\Facades\Config;

class SignupActivate extends Notification
{
    use Queueable;

    protected $user;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = Config::get('app.url') . '/email-confirmation.html?token=' . $notifiable->activation_token;

        return (new MailMessage)
            ->from('lineagebrasilclub@gmail.com', 'Lineage Brasil Club')
            ->subject('Confirme seu Email')
            ->greeting('Seja bem-vindo, ' . $this->user->name . '!')
            ->line('Obrigado por se registrar!')
            ->line('Por favor, antes de qualquer coisa precisamos que confirme seu email.')
            ->action('Confirmar Email', $url, 'success');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
