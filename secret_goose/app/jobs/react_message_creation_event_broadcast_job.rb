class ReactMessageCreationEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(react_message)
    ActionCable
      .server
      .broadcast('react_channel',
                 id: ,
                 created_at: ,
                 content: )
  end
end
